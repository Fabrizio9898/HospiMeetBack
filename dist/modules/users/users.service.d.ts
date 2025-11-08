import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdatePasswordDto, UpdateUserDto } from 'src/dtos/updateUser.dto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): string;
    getById(id: string): Promise<User>;
    updateEmail(id: string, updateUser: UpdateUserDto): Promise<User>;
    getUserByMail(email: string): Promise<User | undefined>;
    updatePassword(id: string, updateUser: UpdatePasswordDto): Promise<User>;
}
