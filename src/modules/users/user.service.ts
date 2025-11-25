import { Injectable } from '@nestjs/common';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private doctorRepository: Repository<User>
  ) {}

  async getByEmail(email: string): Promise<User | undefined> {
    const found: User | null = await this.doctorRepository.findOne({
      where: { email: email },
      relations: ['boss'] 
    });
    return found || undefined;
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return `This action updates a #${id} doctor`;
  }
}
