import { ConfigService } from '@nestjs/config';
import { Doctor } from 'src/entities/doctor.entity';
import { DataSource } from 'typeorm';
type VerificationFiles = {
    dni_front?: Express.Multer.File[];
    dni_back?: Express.Multer.File[];
    medical_licence?: Express.Multer.File[];
};
export declare class UploadService {
    private readonly configService;
    private readonly dataSource;
    private readonly s3service;
    private readonly bucketName;
    private readonly region;
    constructor(configService: ConfigService, dataSource: DataSource);
    uploadDocuments(userId: string, files: VerificationFiles): Promise<{
        message: string;
        urls: {
            dniBack: string;
            dniFront: string;
            medicalLicence: string;
        };
    }>;
    saveDoctorDocuments(userId: string, urlFrente: string, urlDorso: string, urlLicencia: string): Promise<Doctor>;
    generateSignedUrl(documentUrl: string): Promise<string>;
    private uploadToS3;
    private validateDoctorDocuments;
}
export {};
