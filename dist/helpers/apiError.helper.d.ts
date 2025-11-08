import { HttpException } from '@nestjs/common';
import { ApiStatusEnum } from '../enums/apiStatus.enum';
export declare class ApiError {
    exception: new (...args: any[]) => HttpException;
    message: string;
    info: any;
    constructor(message: ApiStatusEnum | null, exception?: new (...args: any[]) => HttpException, info?: any);
}
