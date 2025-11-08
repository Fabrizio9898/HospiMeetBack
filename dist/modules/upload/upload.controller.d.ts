import { UploadService } from './upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadFile(file: {
        dni_front?: Express.Multer.File[];
        dni_back?: Express.Multer.File[];
        medical_licence?: Express.Multer.File[];
    }, id: string): Promise<{
        message: string;
        urls: {
            dniBack: string;
            dniFront: string;
            medicalLicence: string;
        };
    }>;
}
