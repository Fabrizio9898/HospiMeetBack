import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { UserLoginResponse } from './dtos/loginResponse.dto';
import { CheckEmailDto } from 'src/dtos/checkEmail.dto';
import { LoginDto } from 'src/dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { ApiStatusEnum } from 'src/enums/apiStatus.enum';
import { generateToken } from 'src/utils/jwt.util';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { MoreThan, Repository } from 'typeorm';
import { EmailService } from 'src/modules/email/email.service';
import { UserRole } from 'src/enums/roles.enum';
import * as crypto from 'crypto'; 
import { ResetPasswordDto } from 'src/dtos/resetPassword.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
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
    const user = await this.userService.getUserByMail(email.toLowerCase());
    return { exists: !!user };
  }

  async login(loginDto: LoginDto): Promise<UserLoginResponse> {
    const { email, password } = loginDto;

    const user = await this.userService.getUserByMail(email.toLowerCase());

    // Doble chequeo, aunque el frontend ya lo sabe
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new BadRequestException('Credenciales inválidas');
    }

    // Genera el token y devuelve la respuesta
    const token = await generateToken(user);

    const { password: _, ...userClean } = user;

    // 3. Devuelve el objeto DoctorLoginResponse completo
    return {
      message: ApiStatusEnum.LOGIN_SUCCESS, // O el mensaje que uses
      token: token,
      user: userClean
    };
  }
}
