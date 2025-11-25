import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Patient } from 'src/entities/patient.entity';
import { CreatePatientDto } from './dto/createPatient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>
  ) {}

  async search(doctorId: string, query: string): Promise<Patient[]> {
    return this.patientRepository.find({
      where: [
        { doctor: { id: doctorId }, fullname: ILike(`%${query}%`) },
        { doctor: { id: doctorId }, email: ILike(`%${query}%`) },
        { doctor: { id: doctorId }, dni: ILike(`%${query}%`) }
      ],
      order: {
        updatedAt: 'DESC' 
      },
      take: 10 
    });
  }

  // 1. Crear un paciente desde 0 (Vinculado al Doctor)
  async create(
    createPatientDto: CreatePatientDto,
    doctorId: string
  ): Promise<Patient> {
    const patient = await this.patientRepository.findOne({});
    const newPatient = this.patientRepository.create({
      ...createPatientDto,
      doctor: { id: doctorId } 
    });
    return await this.patientRepository.save(newPatient);
  }

  // 2. Obtener listado de pacientes de UN doctor específico
  async findAllByDoctor(doctorId: string): Promise<Patient[]> {
    return await this.patientRepository.find({
      where: { doctor: { id: doctorId } },
      order: { fullname: 'ASC' } 
    });
  }

  // Helper para buscar uno y validar que sea de ese doctor
  async findOne(patientId: string, doctorId: string): Promise<Patient> {
    const patient = await this.patientRepository.findOne({
      where: { id: patientId, doctor: { id: doctorId } }
    });

    if (!patient) {
      throw new NotFoundException(
        'Paciente no encontrado o no pertenece a tu lista'
      );
    }
    return patient;
  }
}
