import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { CheckEmailDto } from 'src/dtos/checkEmail.dto';
import { LoginDto } from 'src/dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { ApiStatusEnum } from 'src/enums/apiStatus.enum';
import { generateToken } from 'src/utils/jwt.util';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { EmailService } from 'src/modules/email/email.service';
import { UserRole } from 'src/enums/roles.enum';
import * as crypto from 'crypto';
import { ResetPasswordDto } from 'src/dtos/resetPassword.dto';
import { User } from 'src/entities/user.entity';
import { UserService } from '../doctors/doctors.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly emailService: EmailService
  ) {}

  async forgotPassword(emailDto: CheckEmailDto) {
    const { email } = emailDto;

    // 1. Buscar usuario por email
    const user = await this.userRepository.findOne({
      where: { email: email.toLowerCase() }
    });

    if (!user) throw new NotFoundException('Credenciales inválidas');

    // 2. VALIDAR EL ROL (Como pediste: solo Admin o SuperAdmin)
    if (user.role !== UserRole.ADMIN && user.role !== UserRole.SUPER_ADMIN) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 3. Generar Token Aleatorio
    const resetToken = crypto.randomBytes(32).toString('hex');

    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 3600000 ms = 1 hora

    // 6. GUARDAR EN BASE DE DATOS (Usando el repositorio)
    await this.userRepository.save(user);

    // 7. ENVIAR EL EMAIL USANDO MAILGUN
    await this.emailService.sendPasswordResetEmail(
      user.email,
      user.fullname,
      resetToken
    );

    return { message: 'Correo de recuperación enviado' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const { token, newPassword } = dto;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await this.userRepository.findOne({
      where: {
        resetPasswordToken: hashedToken,
        resetPasswordExpires: MoreThan(new Date())
      }
    });
    if (!user) {
      throw new BadRequestException('Token inválido o expirado');
    }
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await this.userRepository.save(user);
    return { message: 'Contraseña actualizada correctamente' };
  }

  async checkEmail(checkEmailDto: CheckEmailDto): Promise<{ exists: boolean }> {
    const { email } = checkEmailDto;
    const user = await this.userService.getByEmail(email.toLowerCase());
    return { exists: !!user };
  }
}
