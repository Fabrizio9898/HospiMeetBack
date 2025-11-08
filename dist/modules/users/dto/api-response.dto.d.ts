import { HttpStatus } from '@nestjs/common';
import { ApiStatusEnum } from 'src/enums/apiStatus.enum';
export declare class ApiResponse {
    message: ApiStatusEnum;
    status?: HttpStatus;
}
