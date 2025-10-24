import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Brackets, Repository } from 'typeorm';
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
import { DoctorPublicDto } from './dto/doctorPublic.dto';
import { DoctorListResponseDto } from './dto/doctorResponse.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly mailService: EmailService,
    @InjectRepository(Doctor) private doctorRepository: Repository<Doctor>
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const { name, email } = createAdminDto;

    // 1. Verificar que el email no exista
    const existingUser = await this.userRepository.findOne({
      where: { email }
    });
    if (existingUser) throw new BadRequestException('El email ya está en uso');

    let tempPassword = generator.generate({
      length: 10,
      numbers: true
    });

    const hashed_password = await bcrypt.hash(tempPassword, 10);
    if (!hashed_password) {
      throw new ApiError(ApiStatusEnum.HASHING_FAILED, BadRequestException);
    }
    const newAdmin = this.userRepository.create({
      name,
      email,
      password: hashed_password,
      role: UserRole.ADMIN
    });

    await this.userRepository.save(newAdmin);
    try {
      await this.mailService.sendAdminWelcomeEmail(email, name, tempPassword);
    } catch (error) {
      console.error('Error al enviar email de bienvenida:', error);
      throw new InternalServerErrorException(
        'Admin creado, pero falló el envío del email.'
      );
    }
    return { message: 'Administrador creado y notificado exitosamente' };
  }

  async login(data: LoginDto): Promise<UserLoginResponse> {
    const { email, password } = data;

    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: email })
      .andWhere('user.role IN (:...roles)', {
        roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN]
      })
      .getOne();

    if (!user || !(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException('Credenciales inválidas');

    const token = await generateToken(user);

    const { password: _, ...userClean } = user;

    return {
      message: ApiStatusEnum.LOGIN_SUCCESS,
      token: token,
      user: userClean
    };
  }

  async getDoctors(
    queryDto: GetDoctorsQueryDto
  ){
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

    // --- 2. FILTROS DINÁMICOS (CON DEFAULT) ---

    // ¡AQUÍ ESTÁ EL CAMBIO!
    // Si 'status' es undefined (no se envió), usa PENDING por defecto.
    const statusToFilter = status || Doctor_Status.PENDING;

    // Ahora la consulta SIEMPRE filtra por un estado.
    query.where('doctor.status = :status', { status: statusToFilter });

    // Filtro por BÚSQUEDA (si existe)
    if (search) {
      // Como ya usamos .where(), ahora SIEMPRE usamos .andWhere()
      query.andWhere(
        new Brackets((qb) => {
          // (Usa 'LIKE' para MySQL, 'ILIKE' para Postgres)
          qb.where('doctor.fullname ILIKE :search', {
            search: `%${search}%`
          })
            .orWhere('doctor.dni ILIKE :search', { search: `%${search}%` })
            .orWhere('doctor.email ILIKE :search', { search: `%${search}%` });
        })
      );
    }

    query.orderBy('doctor.createdAt', 'DESC');

    // --- 3. PAGINACIÓN ---
    query.skip((page - 1) * limit);
    query.take(limit);

    // --- 4. EJECUTAR CONSULTA ---
    const [doctors, total] = await query.getManyAndCount();

    return {
      data: doctors,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  async getDashboardKpis(){
    
  }

  findAll() {
    return `This action returns all admin`;
  }

  updateDoctorStatus(id: number, updateAdminDto: UpdateAdminDto) {}

  findOne(id: number) {}
}
