import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Between, Brackets, In, Repository } from 'typeorm';
import generator from 'generate-password';
import * as bcrypt from 'bcrypt';
import { ApiError } from 'src/helpers/apiError.helper';
import { ApiStatusEnum } from 'src/enums/apiStatus.enum';
import { UserRole } from 'src/enums/roles.enum';
import { EmailService } from '../email/email.service';
import { LoginDto } from 'src/dtos/login.dto';
import { generateToken } from 'src/utils/jwt.util';
import { UserLoginResponse } from '../users/auth/dtos/loginResponse.dto';
import { Doctor_Status } from 'src/enums/doctorStatus.enum';
import { Doctor } from 'src/entities/doctor.entity';
import { GetDoctorsQueryDto } from './dto/doctorQuery.dto';
import { Appointment } from 'src/entities/appointment.entity';
import { UploadService } from '../upload/upload.service';
import { UpdateDoctorStatusDto } from './dto/updateDoctorStatus.dto';
import { log } from 'console';
import { AppointmentStatus } from 'src/enums/appointment.enum';
import { SupportTicket } from 'src/entities/SupportTicket.entity';
import { GetTicketsQueryDto } from './dto/getTicketsQuery.dto';
import { TicketResponseDto } from './dto/ticket-response.dto';
import { PatientResponseDto } from './dto/patientResponse.dto';
import { isEmpty } from 'class-validator';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly mailService: EmailService,
    @InjectRepository(Doctor) private doctorRepository: Repository<Doctor>,
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(SupportTicket)
    private readonly ticketRepo: Repository<SupportTicket>,
    private readonly uploadService: UploadService
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const { fullname, email } = createAdminDto;

    const existingUser = await this.userRepository.findOne({
      where: { email }
    });
    if (existingUser) {
      throw new BadRequestException('El email ya está en uso');
    }

    let tempPassword = generator.generate({
      length: 10,
      numbers: true
    });

    const hashed_password = await bcrypt.hash(tempPassword, 10);
    if (!hashed_password) {
      throw new ApiError(ApiStatusEnum.HASHING_FAILED, BadRequestException);
    }
    const newAdmin = this.userRepository.create({
      fullname,
      email,
      password: hashed_password,
      role: UserRole.ADMIN
    });

    await this.userRepository.save(newAdmin);

    try {
      await this.mailService.sendAdminWelcomeEmail(
        email,
        fullname,
        tempPassword
      );
      // Si todo sale bien (usuario creado + email enviado)
      return { message: 'Administrador creado y notificado exitosamente' };
    } catch (error) {
      // Si SOLO el email falla
      console.error('Error al enviar email de bienvenida:', error);
      throw new InternalServerErrorException(
        'Admin creado, pero falló el envío del email.'
      );
    }
  }

  async login(data: LoginDto): Promise<UserLoginResponse> {
    try {
      const { email, password } = data;
      console.log(data);

      const user = await this.userRepository
        .createQueryBuilder('user')
        .where('user.email = :email', { email: email })
        .andWhere('user.role IN (:...roles)', {
          roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN]
        })
        .getOne();

      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('Credenciales inválidas');
      }

      const token = await generateToken(user);

      const { password: _, ...userClean } = user;

      return {
        message: ApiStatusEnum.LOGIN_SUCCESS,
        token: token,
        user: userClean
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      console.error('Error en el login:', error);
      throw new InternalServerErrorException(
        'Error en el servidor durante el login.'
      );
    }
  }

  async getDoctors(queryDto: GetDoctorsQueryDto) {
    // 1. Destructura el DTO
    const {
      status, // Será 'undefined' si no se envía
      search,
      page = 1,
      limit = 10
    } = queryDto;

    const query = this.doctorRepository.createQueryBuilder('doctor');

    query.loadRelationCountAndMap(
      'doctor.specialtyCount',
      'doctor.specialities'
    );

    const statusToFilter = status || Doctor_Status.PENDING;

    query.where('doctor.status = :status', { status: statusToFilter });

    if (search) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('doctor.fullname ILIKE :search', {
            search: `%${search}%`
          })
            .orWhere('doctor.dni ILIKE :search', { search: `%${search}%` })
            .orWhere('doctor.email ILIKE :search', { search: `%${search}%` });
        })
      );
    }

    query.orderBy('doctor.createdAt', 'DESC');

    query.skip((page - 1) * limit);
    query.take(limit);

    const [doctors, total] = await query.getManyAndCount();
    console.log(doctors);
    if (doctors.length > 0) {
      console.log(typeof doctors[0].tarifaPorConsulta);
    }

    return {
      data: doctors,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  async getDashboardKpis() {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    try {
      const countPendingDoctors = this.doctorRepository.count({
        where: { status: Doctor_Status.PENDING }
      });
      console.log(countPendingDoctors);

      const countNewDoctorsMonth = this.doctorRepository.count({
        where: {
          status: Doctor_Status.ACTIVE,
          createdAt: Between(startDate, endDate)
        }
      });

      const sumRevenueMonth = this.appointmentRepository.sum('cost', {
        status: AppointmentStatus.COMPLETED,
        createdAt: Between(startDate, endDate)
      });

      const countAppointmentsMonth = this.appointmentRepository.count({
        where: {
          status: AppointmentStatus.COMPLETED,
          createdAt: Between(startDate, endDate)
        }
      });
      const countNewPatientsMonth = this.userRepository.count({
        where: {
          role: UserRole.PATIENT,
          createdAt: Between(startDate, endDate)
        }
      });

      const [
        pendingDoctorsCount,
        revenueMonth,
        appointmentsMonth,
        newPatientsMonth,
        newDoctorsMonth
      ] = await Promise.all([
        countPendingDoctors,
        sumRevenueMonth,
        countAppointmentsMonth,
        countNewPatientsMonth,
        countNewDoctorsMonth
      ]);

      return {
        pendingDoctorsCount: pendingDoctorsCount || 0,
        revenueMonth: revenueMonth || 0,
        appointmentsMonth: appointmentsMonth || 0,
        newPatientsMonth: newPatientsMonth || 0,
        newDoctorsMonth: newDoctorsMonth || 0
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'No se pudieron cargar las estadísticas'
      );
    }
  }

  async rejectOrApproveDoctors(id: string, updateDto: UpdateDoctorStatusDto) {
    const { status: newStatus, rejectionReason } = updateDto;
    try {
      // 1. Buscar al doctor
      const doctor = await this.doctorRepository.findOneBy({ id });

      if (!doctor) {
        throw new NotFoundException(`Doctor con ID ${id} no encontrado.`);
      }

      if (doctor.status === newStatus) {
        throw new BadRequestException(
          `El doctor ya se encuentra en estado: ${newStatus}`
        );
      }

      if (newStatus === Doctor_Status.REJECTED) {
        if (!rejectionReason || rejectionReason.trim() === '') {
          throw new BadRequestException(
            'Se requiere un motivo para rechazar al doctor.'
          );
        }
        doctor.rejectedReason = rejectionReason.trim();
      } else if (newStatus === Doctor_Status.ACTIVE) {
        //chequear si sus docuemntos fueron verificados

        doctor.rejectedReason = null;
      }
      // 4. Actualizar y guardar
      doctor.status = newStatus;
      await this.doctorRepository.save(doctor);

      return {
        message: `Estado del doctor actualizado a: ${newStatus}`
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      console.error('Error al actualizar estado del doctor:', error);
      throw new InternalServerErrorException('Error al actualizar el estado.');
    }
  }

  async getDoctorDocuments(id: string) {
    try {
      const doctor = await this.doctorRepository
        .createQueryBuilder('doctor')
        .leftJoinAndSelect('doctor.documents', 'documents')
        .leftJoin('doctor.specialities', 'specialities')
        .where('doctor.id = :id', { id })
        .select([
          'doctor',
          'documents',
          'specialities.id',
          'specialities.name',
          'specialities.description'
        ])
        .getOne();

      if (!doctor) {
        throw new ApiError(ApiStatusEnum.USER_NOT_FOUND, NotFoundException);
      }

      const signedUrlPromises = doctor.documents.map(async (doc) => {
        const signedUrl = await this.uploadService.generateSignedUrl(doc.url);
        return {
          ...doc,
          url: signedUrl
        };
      });

      const documentsWithSignedUrls = await Promise.all(signedUrlPromises);
      return {
        ...doctor,
        documents: documentsWithSignedUrls
      };
    } catch (error) {
      console.error('Error al generar URLs firmadas:', error);
      throw new InternalServerErrorException(
        'Error al obtener el perfil del doctor.'
      );
    }
  }

  async getTickets(query: GetTicketsQueryDto): Promise<TicketResponseDto> {
    try {
      const {
        page = 1,
        limit = 10,
        status,
        priority,
        role,
        categories
      } = query;
      const skip = (page - 1) * limit;

      const qb = this.ticketRepo.createQueryBuilder('ticket');

      // 1. Joins: Unimos sin seleccionar *todos* los campos por defecto.
      qb.leftJoin('ticket.patient', 'patient')
        .leftJoin('ticket.doctor', 'doctor')
        .leftJoin('ticket.appointment', 'appointment')

        // 2. Selección explícita (Optimizando la consulta al DB)
        .select([
          'ticket',
          'patient.id',
          'patient.fullname',
          'patient.profile_image',
          'doctor.id',
          'doctor.fullname',
          'doctor.profile_image',
          'appointment.id'
        ]);

      // Filtros dinámicos
      if (status) {
        qb.andWhere('ticket.status = :status', { status });
      }

      if (priority) {
        qb.andWhere('ticket.priority = :priority', { priority });
      }

      if (categories && categories.length > 0) {
        qb.andWhere('ticket.category IN (:...categories)', { categories });
      }

      if (role) {
        qb.andWhere('ticket.reporterRole = :role', { role });
      }

      // Paginación
      qb.orderBy('ticket.createdAt', 'DESC').skip(skip).take(limit);

      const [tickets, total] = await qb.getManyAndCount();

      // Mapeo de datos
      const formattedTickets = tickets.map((ticket) => {
        const isDoctor = ticket.reporterRole === UserRole.DOCTOR;
        const userData = isDoctor ? ticket.doctor : ticket.patient;

        // NOTA: Extracción del ID del appointment (ticket.appointment contiene SOLO el ID)
        const bookingId = ticket.appointment
          ? (ticket.appointment as any).id
          : null;

        return {
          id: ticket.id,
          subject: ticket.subject,
          description: ticket.description,
          category: ticket.category,
          priority: ticket.priority,
          status: ticket.status,
          reason: ticket.reason,
          date: ticket.createdAt.toISOString(),
          adminResponse: ticket.adminResponse,
          bookingId: bookingId,
          user: {
            id: userData?.id,
            fullname: userData?.fullname,
            role: ticket.reporterRole,
            image: userData?.profile_image
          }
        };
      });

      return {
        data: formattedTickets,
        meta: {
          total,
          page,
          lastPage: Math.ceil(total / limit),
          limit
        }
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener los reportes del sistema'
      );
    }
  }

  async findPatient(id: string): Promise<PatientResponseDto> {
    const user: User | undefined = await this.userRepository.findOne({
      where: { id },
      relations: [
        'appointments',
        'appointments.doctor',
        'reviews',
        'supportTickets'
      ],
      order: {
        createdAt: 'DESC' // Ordenar citas por fecha
      }
    });
    if (isEmpty(user)) {
      throw new ApiError(ApiStatusEnum.USER_NOT_FOUND, NotFoundException);
    }
    return user;
  }

  async getAdmins() {
    const admins = await this.userRepository.find({
      where: {
        role: In([UserRole.ADMIN, UserRole.SUPER_ADMIN])
      },
      // Seleccionamos solo lo necesario por seguridad (evitar enviar passwords)
      select: ['id', 'fullname', 'email', 'role', 'profile_image', 'createdAt'],
      order: {
        createdAt: 'DESC' 
      }
    });

    return admins;
  }
}
