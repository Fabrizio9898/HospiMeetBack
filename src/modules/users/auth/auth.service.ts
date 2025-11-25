import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { UserService } from '../user.service';
import { DoctorLoginResponse } from './dtos/loginResponse.dto';
import { LoginDto } from 'src/dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { ApiStatusEnum } from 'src/enums/apiStatus.enum';
import { generateToken } from 'src/utils/jwt.util';
import { CreateDoctorDto } from './dtos/create-doctor.dto';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiError } from 'src/helpers/apiError.helper';
import { UserRole } from 'src/enums/roles.enum';
import { SubscriptionPlan } from 'src/dtos/subscriptionPlan.dto';
import { Subscription } from 'src/entities/subscription.entity';
import { SubscriptionStatus } from 'src/dtos/subscriptionStatus.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Subscription)
    private subRepository: Repository<Subscription>
  ) {}


  async login(loginDto: LoginDto): Promise<DoctorLoginResponse> {
    const { email, password } = loginDto;

    const user = await this.userService.getByEmail(email.toLowerCase());

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

    const { password: _, ...doctorClean } = user;

    // 3. Devuelve el objeto DoctorLoginResponse completo
    return {
      message: ApiStatusEnum.LOGIN_SUCCESS, // O el mensaje que uses
      token: token,
      user: doctorClean
    };
  }

  async create(createDoctorDto: CreateDoctorDto): Promise<User> {
    const { email, password, ...restUser } = createDoctorDto;
    const lowerEmail = email.toLowerCase();

    // 1. Validar existencia
    const existingUser = await this.userRepository.findOne({
      where: { email: lowerEmail }
    });
    if (existingUser) {
      throw new ApiError(ApiStatusEnum.MAIL_IN_USE, BadRequestException);
    }

    // 2. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Preparar fechas del Trial (7 días desde hoy)
    const now = new Date();
    const trialEndDate = new Date();
    trialEndDate.setDate(now.getDate() + 7); // Sumamos 7 días

    // 4. Crear el Usuario (DOCTOR por defecto)
    // Nota: Aún no lo guardamos, primero preparamos el objeto
    const newUser = this.userRepository.create({
      ...restUser,
      email: lowerEmail,
      password: hashedPassword,
      role: UserRole.DOCTOR, // Siempre es Doctor si se registra por aquí
      currentPlan: SubscriptionPlan.FREE_TRIAL,
      planExpiresAt: trialEndDate // Guardamos la fecha en el user para acceso rápido (Guard)
      // status: Doctor_Status.ACTIVE (si usas ese enum)
    });

    try {
      // Guardamos el usuario primero para tener su ID
      const savedUser = await this.userRepository.save(newUser);

      // 5. Crear la Entidad Suscripción (Historial)
      // Esto es vital para cuando quieras gestionar renovaciones o ver historial
      const newSubscription = this.subRepository.create({
        user: savedUser, // Relación con el usuario creado
        plan: SubscriptionPlan.FREE_TRIAL,
        startDate: now,
        endDate: trialEndDate,
        status: SubscriptionStatus.TRIALING,
        isActive: true,
        autoRenew: false,
        paymentProvider: 'manual'
      });

      await this.subRepository.save(newSubscription);

      // Retornamos el usuario (sin password)
      delete savedUser.password;
      return savedUser;
    } catch (error) {
      // Manejo de errores
      if (error instanceof ApiError) throw error;
      throw new ApiError(error?.message, InternalServerErrorException, error);
    }
  }
}
