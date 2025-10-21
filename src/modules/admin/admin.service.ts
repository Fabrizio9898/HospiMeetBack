import { BadRequestException, Injectable } from '@nestjs/common';
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

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
    // private readonly mailerService: MailerService // Inyectas el mailer
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const { name, email } = createAdminDto;

    // 1. Verificar que el email no exista
    const existingUser = await this.userRepository.findOne({
      where: { email }
    });
    if (existingUser) throw new BadRequestException('El email ya está en uso');

    let password = generator.generate({
      length: 10,
      numbers: true
    });

    const hashed_password = await bcrypt.hash(password, 10);
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
    // 5. Enviar el email con la contraseña en TEXTO PLANO
    // try {
    //   await this.sendAdminWelcomeEmail(email, name, tempPassword);
    // } catch (error) {
    //   // Opcional: Si el email falla, ¿deberías borrar al usuario?
    //   // Por ahora, solo informamos.
    //   console.error('Error al enviar email de bienvenida:', error);
    //   throw new InternalServerErrorException(
    //     'Admin creado, pero falló el envío del email.'
    //   );
    // }

    // ¡Listo!
    return { message: 'Administrador creado y notificado exitosamente' };
  }

  findAll() {
    return `This action returns all admin`;
  }

  updateDoctorStatus(id: number, updateAdminDto: UpdateAdminDto) {}

  findOne(id: number) {}
}
