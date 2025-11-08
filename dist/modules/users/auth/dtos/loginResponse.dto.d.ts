import { ApiStatusEnum } from 'src/enums/apiStatus.enum';
import { UserClean } from 'src/modules/users/dto/cleanUser.dto';
export declare class UserLoginResponse {
    message: ApiStatusEnum;
    token: string;
    user: UserClean;
}
