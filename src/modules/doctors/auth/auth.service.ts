import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { DoctorsService } from '../doctors.service';
import { CheckEmailDto } from 'src/dtos/checkEmail.dto';
import { DoctorLoginResponse } from './dtos/loginResponse.dto';
import { LoginDto } from 'src/dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { Doctor_Status } from 'src/enums/doctorStatus.enum';
import { ApiStatusEnum } from 'src/enums/apiStatus.enum';
import { generateToken } from 'src/utils/jwt.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly doctorService: DoctorsService
    // private readonly mailService: MailerService
  ) {}

  // En tu doctor-auth.service.ts

  async checkEmail(checkEmailDto: CheckEmailDto): Promise<{ exists: boolean }> {
    // No necesitas devolver el status

    const { email } = checkEmailDto;
    const doctor = await this.doctorService.getByEmail(email.toLowerCase());

    // 1. CASO: No existe (va a registro)
    if (!doctor) {
      return { exists: false };
    }

    if (doctor.status === Doctor_Status.BANNED) {
      throw new ForbiddenException(
        'Tu cuenta ha sido rechazada o suspendida. Contacta a soporte.'
      );
    }

    // 3. CASO: Existe Y está aprobado (va a pedir contraseña)
    return { exists: true };
  }

  /**
   * PASO 2 (Opción A): Si el email SÍ existe, el frontend llama a esta.
   */
  async login(loginDto: LoginDto): Promise<DoctorLoginResponse> {
    const { email, password } = loginDto;

    const user = await this.doctorService.getByEmail(email.toLowerCase());

    // Doble chequeo, aunque el frontend ya lo sabe
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new BadRequestException('Credenciales inválidas');
    }

    // Genera el token y devuelve la respuesta
    const token=await generateToken(user);

    const { password: _, ...doctorClean } = user;

    // 3. Devuelve el objeto DoctorLoginResponse completo
    return {
      message: ApiStatusEnum.LOGIN_SUCCESS, // O el mensaje que uses
      token: token,
      user: doctorClean
    };
  }

}
