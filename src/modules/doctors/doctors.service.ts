import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from 'src/entities/doctor.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiError } from 'src/helpers/apiError.helper';
import { ApiStatusEnum } from 'src/enums/apiStatus.enum';
import { Doctor_Status } from 'src/enums/doctorStatus.enum';


@Injectable()
export class DoctorsService {
  constructor(@InjectRepository(Doctor) private doctorRepository:Repository<Doctor>){}
  
  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    try {
      const { email, password, ...restUser } = createDoctorDto;
      const lower_email = email.toLowerCase();

      const existingUser = await this.getByEmail(lower_email);

      if (existingUser) {
        throw new ApiError(ApiStatusEnum.MAIL_IN_USE, BadRequestException);
      }

      const hashed_password = await bcrypt.hash(password, 10);
      if (!hashed_password) {
        throw new ApiError(ApiStatusEnum.HASHING_FAILED, BadRequestException);
      }

      const createdUser: Doctor = this.doctorRepository.create({
        ...restUser,
        status:Doctor_Status.INACTIVE,
        email: lower_email,
        password: hashed_password
      });

      await this.doctorRepository.save(createdUser);

      return createdUser;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(error?.message, InternalServerErrorException, error);
    }
  }

   async getByEmail(email: string): Promise<Doctor | undefined> {
      const found: Doctor | null = await this.doctorRepository.findOne({
        where: { email: email }
      });
      return found || undefined;
    }

  findAll() {
    return `This action returns all doctors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} doctor`;
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return `This action updates a #${id} doctor`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctor`;
  }
}
