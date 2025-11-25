import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from 'src/entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AppointmentStatus } from 'src/enums/appointment.enum';
import { PatientService } from '../patient/patient.service';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly patientService: PatientService // Inyectamos para reutilizar lógica
  ) {}

  // 1. Crear Turno (Maneja paciente nuevo o existente)
  async create(
    createDto: CreateAppointmentDto,
    doctorId: string
  ): Promise<Appointment> {
    let patient;

    // Lógica Híbrida: ¿Paciente Nuevo o Existente?
    if (createDto.patientId) {
      // Buscamos existente y validamos que sea de este doctor
      patient = await this.patientService.findOne(
        createDto.patientId,
        doctorId
      );
    } else if (createDto.newPatient) {
      // Creamos uno nuevo al vuelo
      patient = await this.patientService.create(
        createDto.newPatient,
        doctorId
      );
    } else {
      throw new BadRequestException(
        'Debes proporcionar un patientId o datos para un newPatient'
      );
    }

    // Generar Link de Videollamada (Simulado o usando API Jitsi)
    const meetingLink = `https://meet.jit.si/Consulta-${doctorId}-${Date.now()}`;

    // Calculamos costos (Ejemplo simple)
    const cost = createDto.cost;
    const platformFee = cost * 0.05; // 5% comisión plataforma (ejemplo)
    const netIncome = cost - platformFee;

    const newAppointment = this.appointmentRepository.create({
      dateHour: createDto.dateHour,
      status: AppointmentStatus.PENDING,
      meetingLink: meetingLink,
      cost: cost,
      platformFee: platformFee,
      doctorNetIncome: netIncome,
      patient: patient, // Relación con Paciente
      doctor: { id: doctorId } // Relación con el Doctor (User entity)
    });

    return await this.appointmentRepository.save(newAppointment);
  }

  // 2. Obtener Turnos del Doctor (Para el Dashboard)
  async findAllByDoctor(doctorId: string): Promise<Appointment[]> {
    return await this.appointmentRepository.find({
      where: { doctor: { id: doctorId } },
      relations: ['patient'], // Traemos datos del paciente para mostrar nombre en el calendario
      order: { dateHour: 'ASC' }
    });
  }

  // 3. Obtener Detalle de un Turno específico
  async findOneDetail(
    appointmentId: string,
    doctorId: string
  ): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: {
        id: appointmentId,
        doctor: { id: doctorId } // Seguridad: solo el dueño puede verlo
      },
      relations: ['patient', 'transaction'] // Traemos paciente y si ya pagó (transaction)
    });

    if (!appointment) {
      throw new NotFoundException('Turno no encontrado');
    }

    return appointment;
  }
}
