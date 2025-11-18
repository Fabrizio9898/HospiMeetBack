import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UserRole } from 'src/enums/roles.enum';
import { LoginDto } from 'src/dtos/login.dto';
import { UserLoginResponse } from '../users/auth/dtos/loginResponse.dto';
import { GetDoctorsQueryDto } from './dto/doctorQuery.dto';
import { DoctorListResponseDto } from './dto/doctorResponse.dto';
import { UpdateDoctorStatusDto } from './dto/updateDoctorStatus.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    create(createAdminDto: CreateAdminDto): Promise<{
        message: string;
    }>;
    login(data: LoginDto): Promise<UserLoginResponse>;
    getDoctors(doctorQuery: GetDoctorsQueryDto): Promise<DoctorListResponseDto>;
    getKpis(): Promise<{
        pendingDoctorsCount: number;
        revenueMonth: number;
        appointmentsMonth: number;
        newPatientsMonth: number;
        newDoctorsMonth: number;
    }>;
    getDoctorDocuments(id: string): Promise<{
        documents: {
            url: string;
            id: string;
            type: import("../../enums/doctorDocument.enum").DoctorDocumentType;
            verified: boolean;
            doctor: import("../../entities/doctor.entity").Doctor;
            uploadedAt: Date;
        }[];
        id: string;
        profile_image: string;
        email: string;
        password: string;
        fullname: string;
        dni: string;
        medicalLicenseNumber: string;
        status: import("../../enums/doctorStatus.enum").Doctor_Status;
        phoneNumber: string;
        tarifaPorConsulta: number;
        role: UserRole;
        rejectedReason?: string;
        supportTickets: import("../../entities/supportTickets.entity").SupportTicket[];
        schedules: import("../../entities/doctor-schedules.entity").DoctorSchedule[];
        appointments: import("../../entities/appointment.entity").Appointment[];
        reviews: import("../../entities/review.entity").Review[];
        pagosHonorarios: import("../../entities/doctor-payment.entity").DoctorPayment[];
        disponibilidades: import("../../entities/doctor-availability.entity").DoctorAvailability[];
        specialities: import("../../entities/doctor-especiality.entity").DoctorSpeciality[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateDoctorStatus(id: string, updateStatusDto: UpdateDoctorStatusDto): Promise<{
        message: string;
    }>;
    verifyDocument(id: string, updateStatusDto: UpdateDoctorStatusDto): Promise<{
        message: string;
    }>;
}
