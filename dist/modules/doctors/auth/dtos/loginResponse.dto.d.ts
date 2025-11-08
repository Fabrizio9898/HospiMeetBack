import { ApiStatusEnum } from 'src/enums/apiStatus.enum';
import { DoctorClean } from '../../dto/doctor-clean.dto';
export declare class DoctorLoginResponse {
    message: ApiStatusEnum;
    token: string;
    user: DoctorClean;
}
