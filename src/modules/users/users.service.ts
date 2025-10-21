import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { isNotEmpty } from 'class-validator';
import { ApiError } from 'src/helpers/apiError.helper';
import { ApiStatusEnum } from 'src/enums/apiStatus.enum';
import { ApiResponse } from './dto/api-response.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ApiResponse> {
    try {
      const { email, password, ...restUser } = createUserDto;
      const lower_email = email.toLowerCase();

      if (isNotEmpty(this.getUserByMail(lower_email)))
        throw new ApiError(ApiStatusEnum.MAIL_IN_USE, BadRequestException);

      const hashed_password = await bcrypt.hash(password, 10);

      if (!hashed_password) {
        throw new ApiError(ApiStatusEnum.HASHING_FAILED, BadRequestException);
      }

      const createdUser: User = await this.userRepository.create({
        ...restUser,
        email: lower_email,
        password: hashed_password
      });

      await this.userRepository.save(createdUser);

      return { message: ApiStatusEnum.REGISTRATION_SUCCESS };
    } catch (error) {
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
    return found ? found : undefined;
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
