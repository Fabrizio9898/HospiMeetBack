import { DoctorsService } from '../doctors.service';
import { CheckEmailDto } from 'src/dtos/checkEmail.dto';
import { DoctorLoginResponse } from './dtos/loginResponse.dto';
import { LoginDto } from 'src/dtos/login.dto';
export declare class AuthService {
    private readonly doctorService;
    constructor(doctorService: DoctorsService);
    checkEmail(checkEmailDto: CheckEmailDto): Promise<{
        exists: boolean;
    }>;
    login(loginDto: LoginDto): Promise<DoctorLoginResponse>;
}
