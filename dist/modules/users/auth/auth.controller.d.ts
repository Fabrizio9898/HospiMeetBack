import { AuthService } from './auth.service';
import { LoginDto } from 'src/dtos/login.dto';
import { CheckEmailDto } from 'src/dtos/checkEmail.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    checkEmail(checkEmailDto: CheckEmailDto): Promise<{
        exists: boolean;
    }>;
    userLogin(userLoginDto: LoginDto): Promise<import("./dtos/loginResponse.dto").UserLoginResponse>;
}
