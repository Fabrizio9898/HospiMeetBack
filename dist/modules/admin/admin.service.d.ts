import { CreateAdminDto } from './dto/create-admin.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserRole } from 'src/enums/roles.enum';
import { EmailService } from '../email/email.service';
import { LoginDto } from 'src/dtos/login.dto';
import { UserLoginResponse } from '../users/auth/dtos/loginResponse.dto';
import { Doctor_Status } from 'src/enums/doctorStatus.enum';
import { Doctor } from 'src/entities/doctor.entity';
import { GetDoctorsQueryDto } from './dto/doctorQuery.dto';
import { Appointment } from 'src/entities/appointment.entity';
import { UploadService } from '../upload/upload.service';
import { UpdateDoctorStatusDto } from './dto/updateDoctorStatus.dto';
export declare class AdminService {
    private userRepository;
    private readonly mailService;
    private doctorRepository;
    private appointmentRepository;
    private readonly uploadService;
    constructor(userRepository: Repository<User>, mailService: EmailService, doctorRepository: Repository<Doctor>, appointmentRepository: Repository<Appointment>, uploadService: UploadService);
    create(createAdminDto: CreateAdminDto): Promise<{
        message: string;
    }>;
    login(data: LoginDto): Promise<UserLoginResponse>;
    getDoctors(queryDto: GetDoctorsQueryDto): Promise<{
        data: Doctor[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getDashboardKpis(): Promise<{
        pendingDoctorsCount: number;
        revenueMonth: number;
        appointmentsMonth: number;
        newPatientsMonth: number;
        newDoctorsMonth: number;
    }>;
    rejectOrApproveDoctors(id: string, updateDto: UpdateDoctorStatusDto): Promise<{
        message: string;
    }>;
    getDoctorDocuments(id: string): Promise<{
        documents: {
            url: string;
            id: string;
            type: import("../../enums/doctorDocument.enum").DoctorDocumentType;
            verified: boolean;
            doctor: Doctor;
            uploadedAt: Date;
        }[];
        id: string;
        profile_image: string;
        email: string;
        password: string;
        fullname: string;
        dni: string;
        medicalLicenseNumber: string;
        status: Doctor_Status;
        phoneNumber: string;
        tarifaPorConsulta: number;
        role: UserRole;
        rejectedReason?: string;
        supportTickets: import("../../entities/supportTickets.entity").SupportTicket[];
        schedules: import("../../entities/doctor-schedules.entity").DoctorSchedule[];
        appointments: Appointment[];
        reviews: import("../../entities/review.entity").Review[];
        pagosHonorarios: import("../../entities/doctor-payment.entity").DoctorPayment[];
        disponibilidades: import("../../entities/doctor-availability.entity").DoctorAvailability[];
        specialities: import("../../entities/doctor-especiality.entity").DoctorSpeciality[];
        createdAt: Date;
        updatedAt: Date;
    }>;
}
