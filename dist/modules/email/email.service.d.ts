import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private configService;
    private mg;
    private domain;
    private fromEmail;
    constructor(configService: ConfigService);
    sendAdminWelcomeEmail(email: string, name: string, tempPassword: string): Promise<any>;
}
