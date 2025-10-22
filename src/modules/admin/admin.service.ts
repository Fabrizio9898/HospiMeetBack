import {
  BadRequestException,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import generator from 'generate-password';
import * as bcrypt from 'bcrypt';
import { ApiError } from 'src/helpers/apiError.helper';
import { ApiStatusEnum } from 'src/enums/apiStatus.enum';
import { UserRole } from 'src/enums/roles.enum';
import { EmailService } from '../email/email.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly mailService: EmailService // Inyectas el mailer
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

  findAll() {
    return `This action returns all admin`;
  }

  updateDoctorStatus(id: number, updateAdminDto: UpdateAdminDto) {}

  findOne(id: number) {}
}
