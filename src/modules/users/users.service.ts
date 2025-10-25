import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
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

  async getById(id: string) {
    try {
      return await this.userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: 1 })
        .getOneOrFail();
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw error;
      }
      throw new ApiError(error?.message, InternalServerErrorException, error);
    }
  }

  //revisar aca el tema del email

  async updateEmail(id: string, updateUser: UpdateUserDto) {
    const { email } = updateUser;
    const found_user: User | undefined = await this.userRepository.findOneBy({
      id
    });

    if (isEmpty(found_user)) {
      throw new ApiError(ApiStatusEnum.USER_NOT_FOUND, NotFoundException);
    }

    if (updateUser.email) {
      const email_existed = await this.getUserByMail(email);
      if (!email_existed)
        throw new ApiError(
          ApiStatusEnum.EMAIL_ALREADY_IN_USE,
          BadRequestException
        );
    }

    const merged_user: User = this.userRepository.merge(found_user, updateUser);

    return await this.userRepository.save(merged_user);
  }

  async getUserByMail(email: string): Promise<User | undefined> {
    const found: User | null = await this.userRepository.findOne({
      where: { email: email }
    });
    return found || undefined;
  }

  async updatePassword(id: string, updateUser: UpdatePasswordDto) {
    const { actual_password, password, confirm_password } = updateUser;

    const user = await this.getById(id);

    if (user.password !== actual_password) {
      throw new ApiError(
        ApiStatusEnum.INVALID_CREDENTIALS,
        BadRequestException
      );
    }

    if (password !== confirm_password) {
      throw new ApiError(
        ApiStatusEnum.PASSWORDS_DONT_MATCH,
        BadRequestException
      );
    }

    const is_same_password = await bcrypt.compare(password, user.password);
    if (is_same_password) {
      throw new ApiError(
        ApiStatusEnum.PASSWORD_SAME_AS_OLD,
        BadRequestException
      );
    }

    const hashed_password = await bcrypt.hash(password, 10);

    if (!hashed_password) {
      throw new ApiError(ApiStatusEnum.HASHING_FAILED, BadRequestException);
    }
    const merged_user: User = this.userRepository.merge(user, {
      password: hashed_password
    });

    return await this.userRepository.save(merged_user);
  }
}
