import {
  BadRequestException,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { ApiError } from 'src/helpers/apiError.helper';
import { ApiStatusEnum } from 'src/enums/apiStatus.enum';
import * as bcrypt from 'bcrypt';

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

  async getUserByMail(email: string): Promise<User | undefined> {
    const found: User | null = await this.userRepository.findOne({
      where: { email: email }
    });
    return found || undefined;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
