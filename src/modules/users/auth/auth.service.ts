import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { UserLoginResponse } from './dtos/loginResponse.dto';
import { CheckEmailDto } from 'src/dtos/checkEmail.dto';
import { LoginDto } from 'src/dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { ApiStatusEnum } from 'src/enums/apiStatus.enum';
import { generateToken } from 'src/utils/jwt.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService
    // private readonly mailService: MailerService
  ) {}

  async checkEmail(checkEmailDto: CheckEmailDto): Promise<{ exists: boolean }> {
    const { email } = checkEmailDto;
    const user = await this.userService.getUserByMail(email.toLowerCase());

    // Responde si existe o no
    return { exists: !!user };
  }

  /**
   * PASO 2 (Opción A): Si el email SÍ existe, el frontend llama a esta.
   */
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
