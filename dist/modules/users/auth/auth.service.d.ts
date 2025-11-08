import { UsersService } from '../users.service';
import { UserLoginResponse } from './dtos/loginResponse.dto';
import { CheckEmailDto } from 'src/dtos/checkEmail.dto';
import { LoginDto } from 'src/dtos/login.dto';
export declare class AuthService {
    private readonly userService;
    constructor(userService: UsersService);
    checkEmail(checkEmailDto: CheckEmailDto): Promise<{
        exists: boolean;
    }>;
    login(loginDto: LoginDto): Promise<UserLoginResponse>;
}
