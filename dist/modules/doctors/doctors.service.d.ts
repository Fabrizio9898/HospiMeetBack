import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from 'src/entities/doctor.entity';
import { Repository } from 'typeorm';
export declare class DoctorsService {
    private doctorRepository;
    constructor(doctorRepository: Repository<Doctor>);
    create(createDoctorDto: CreateDoctorDto): Promise<Doctor>;
    getByEmail(email: string): Promise<Doctor | undefined>;
    update(id: number, updateDoctorDto: UpdateDoctorDto): string;
}
