import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { ApiError } from 'src/helpers/apiError.helper';
import { ApiStatusEnum } from 'src/enums/apiStatus.enum';
import * as bcrypt from 'bcrypt';
import { isEmpty, isNotEmpty } from 'class-validator';
import { UpdatePasswordDto, UpdateUserDto } from 'src/dtos/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { email, password, ...restUser } = createUserDto;
      const lower_email = email.toLowerCase();

      const existingUser = await this.getUserByMail(lower_email);

      if (existingUser) {
        throw new ApiError(ApiStatusEnum.MAIL_IN_USE, BadRequestException);
      }

      const hashed_password = await bcrypt.hash(password, 10);
      if (!hashed_password) {
        throw new ApiError(ApiStatusEnum.HASHING_FAILED, BadRequestException);
      }

      const createdUser: User = this.userRepository.create({
        ...restUser,
        email: lower_email,
        password: hashed_password
      });

      await this.userRepository.save(createdUser);

      return createdUser;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(error?.message, InternalServerErrorException, error);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async getById(id: string): Promise<User> {
    try {
      return await this.userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: id })
        .getOneOrFail();
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new ApiError(ApiStatusEnum.USER_NOT_FOUND, NotFoundException);
      }
      throw new ApiError(error?.message, InternalServerErrorException, error);
    }
  }

  async updateEmail(id: string, updateUser: UpdateUserDto) {
    try {
      const { email } = updateUser;
      const found_user: User | undefined = await this.userRepository.findOneBy({
        id
      });

      if (isEmpty(found_user)) {
        throw new ApiError(ApiStatusEnum.USER_NOT_FOUND, NotFoundException);
      }

      if (updateUser.email) {
        const email_existed = await this.getUserByMail(email);

        if (email_existed && email_existed.id !== found_user.id) {
          throw new ApiError(
            ApiStatusEnum.EMAIL_ALREADY_IN_USE,
            BadRequestException
          );
        }
      }

      const merged_user: User = this.userRepository.merge(
        found_user,
        updateUser
      );

      return await this.userRepository.save(merged_user);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(error?.message, InternalServerErrorException, error);
    }
  }

  async getUserByMail(email: string): Promise<User | undefined> {
    try {
      const found: User | null = await this.userRepository.findOne({
        where: { email: email.toLowerCase() }
      });
      return found || undefined;
    } catch (error) {
      throw new ApiError(error?.message, InternalServerErrorException, error);
    }
  }

  async updatePassword(id: string, updateUser: UpdatePasswordDto) {
    try {
      const { actual_password, newPassword, confirm_password } = updateUser;

      const user = await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.password') 
        .where('user.id = :id', { id })
        .getOne();

      if (!user) {
        throw new ApiError(ApiStatusEnum.USER_NOT_FOUND, NotFoundException);
      }

      const isActualPasswordMatch = await bcrypt.compare(
        actual_password,
        user.password
      );

      if (!isActualPasswordMatch) {
        throw new ApiError(
          ApiStatusEnum.INVALID_CREDENTIALS,
          UnauthorizedException // Es mejor 401 que 400
        );
      }

      if (newPassword !== confirm_password) {
        throw new ApiError(
          ApiStatusEnum.PASSWORDS_DONT_MATCH,
          BadRequestException
        );
      }

      const is_same_password = await bcrypt.compare(newPassword, user.password);
      if (is_same_password) {
        throw new ApiError(
          ApiStatusEnum.PASSWORD_SAME_AS_OLD,
          BadRequestException
        );
      }

      const hashed_password = await bcrypt.hash(newPassword, 10);
      if (!hashed_password) {
        throw new ApiError(ApiStatusEnum.HASHING_FAILED, BadRequestException);
      }

      // 6. Guarda el usuario
      const merged_user: User = this.userRepository.merge(user, {
        password: hashed_password
      });

      return await this.userRepository.save(merged_user);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(error?.message, InternalServerErrorException, error);
    }
  }
}
