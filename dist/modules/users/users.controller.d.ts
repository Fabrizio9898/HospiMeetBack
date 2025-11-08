import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto, UpdateUserDto } from 'src/dtos/updateUser.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("../../entities/user.entity").User>;
    updateEmail(id: string, updateUser: UpdateUserDto): Promise<import("../../entities/user.entity").User>;
    updatePassword(id: string, updateUser: UpdatePasswordDto): Promise<import("../../entities/user.entity").User>;
}
