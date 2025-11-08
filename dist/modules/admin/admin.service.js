"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../entities/user.entity");
const typeorm_2 = require("typeorm");
const generate_password_1 = __importDefault(require("generate-password"));
const bcrypt = __importStar(require("bcrypt"));
const apiError_helper_1 = require("../../helpers/apiError.helper");
const apiStatus_enum_1 = require("../../enums/apiStatus.enum");
const roles_enum_1 = require("../../enums/roles.enum");
const email_service_1 = require("../email/email.service");
const jwt_util_1 = require("../../utils/jwt.util");
const doctorStatus_enum_1 = require("../../enums/doctorStatus.enum");
const doctor_entity_1 = require("../../entities/doctor.entity");
const appointment_entity_1 = require("../../entities/appointment.entity");
const upload_service_1 = require("../upload/upload.service");
const appointment_enum_1 = require("../../enums/appointment.enum");
let AdminService = class AdminService {
    userRepository;
    mailService;
    doctorRepository;
    appointmentRepository;
    uploadService;
    constructor(userRepository, mailService, doctorRepository, appointmentRepository, uploadService) {
        this.userRepository = userRepository;
        this.mailService = mailService;
        this.doctorRepository = doctorRepository;
        this.appointmentRepository = appointmentRepository;
        this.uploadService = uploadService;
    }
    async create(createAdminDto) {
        const { name, email } = createAdminDto;
        const existingUser = await this.userRepository.findOne({
            where: { email }
        });
        if (existingUser) {
            throw new common_1.BadRequestException('El email ya está en uso');
        }
        let tempPassword = generate_password_1.default.generate({
            length: 10,
            numbers: true
        });
        const hashed_password = await bcrypt.hash(tempPassword, 10);
        if (!hashed_password) {
            throw new apiError_helper_1.ApiError(apiStatus_enum_1.ApiStatusEnum.HASHING_FAILED, common_1.BadRequestException);
        }
        const newAdmin = this.userRepository.create({
            name,
            email,
            password: hashed_password,
            role: roles_enum_1.UserRole.ADMIN
        });
        await this.userRepository.save(newAdmin);
        try {
            await this.mailService.sendAdminWelcomeEmail(email, name, tempPassword);
            return { message: 'Administrador creado y notificado exitosamente' };
        }
        catch (error) {
            console.error('Error al enviar email de bienvenida:', error);
            throw new common_1.InternalServerErrorException('Admin creado, pero falló el envío del email.');
        }
    }
    async login(data) {
        try {
            const { email, password } = data;
            console.log(data);
            const user = await this.userRepository
                .createQueryBuilder('user')
                .where('user.email = :email', { email: email })
                .andWhere('user.role IN (:...roles)', {
                roles: [roles_enum_1.UserRole.ADMIN, roles_enum_1.UserRole.SUPER_ADMIN]
            })
                .getOne();
            if (!user || !(await bcrypt.compare(password, user.password))) {
                throw new common_1.UnauthorizedException('Credenciales inválidas');
            }
            const token = await (0, jwt_util_1.generateToken)(user);
            const { password: _, ...userClean } = user;
            return {
                message: apiStatus_enum_1.ApiStatusEnum.LOGIN_SUCCESS,
                token: token,
                user: userClean
            };
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            console.error('Error en el login:', error);
            throw new common_1.InternalServerErrorException('Error en el servidor durante el login.');
        }
    }
    async getDoctors(queryDto) {
        const { status, search, page = 1, limit = 10 } = queryDto;
        const query = this.doctorRepository.createQueryBuilder('doctor');
        query.loadRelationCountAndMap('doctor.specialtyCount', 'doctor.specialities');
        const statusToFilter = status || doctorStatus_enum_1.Doctor_Status.PENDING;
        query.where('doctor.status = :status', { status: statusToFilter });
        if (search) {
            query.andWhere(new typeorm_2.Brackets((qb) => {
                qb.where('doctor.fullname ILIKE :search', {
                    search: `%${search}%`
                })
                    .orWhere('doctor.dni ILIKE :search', { search: `%${search}%` })
                    .orWhere('doctor.email ILIKE :search', { search: `%${search}%` });
            }));
        }
        query.orderBy('doctor.createdAt', 'DESC');
        query.skip((page - 1) * limit);
        query.take(limit);
        const [doctors, total] = await query.getManyAndCount();
        console.log(doctors);
        if (doctors.length > 0) {
            console.log(typeof (doctors[0].tarifaPorConsulta));
        }
        return {
            data: doctors,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        };
    }
    async getDashboardKpis() {
        const now = new Date();
        const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        console.log('holaaaaaa');
        try {
            const countPendingDoctors = this.doctorRepository.count({
                where: { status: doctorStatus_enum_1.Doctor_Status.PENDING }
            });
            console.log(countPendingDoctors);
            const countNewDoctorsMonth = this.doctorRepository.count({
                where: {
                    status: doctorStatus_enum_1.Doctor_Status.ACTIVE,
                    createdAt: (0, typeorm_2.Between)(startDate, endDate)
                }
            });
            const sumRevenueMonth = this.appointmentRepository.sum('cost', {
                status: appointment_enum_1.AppointmentStatus.COMPLETED,
                createdAt: (0, typeorm_2.Between)(startDate, endDate)
            });
            const countAppointmentsMonth = this.appointmentRepository.count({
                where: {
                    status: appointment_enum_1.AppointmentStatus.COMPLETED,
                    createdAt: (0, typeorm_2.Between)(startDate, endDate)
                }
            });
            const countNewPatientsMonth = this.userRepository.count({
                where: {
                    role: roles_enum_1.UserRole.PATIENT,
                    createdAt: (0, typeorm_2.Between)(startDate, endDate)
                }
            });
            const [pendingDoctorsCount, revenueMonth, appointmentsMonth, newPatientsMonth, newDoctorsMonth] = await Promise.all([
                countPendingDoctors,
                sumRevenueMonth,
                countAppointmentsMonth,
                countNewPatientsMonth,
                countNewDoctorsMonth
            ]);
            return {
                pendingDoctorsCount: pendingDoctorsCount || 0,
                revenueMonth: revenueMonth || 0,
                appointmentsMonth: appointmentsMonth || 0,
                newPatientsMonth: newPatientsMonth || 0,
                newDoctorsMonth: newDoctorsMonth || 0
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('No se pudieron cargar las estadísticas');
        }
    }
    async rejectOrApproveDoctors(id, updateDto) {
        const { status: newStatus, rejectionReason } = updateDto;
        try {
            const doctor = await this.doctorRepository.findOneBy({ id });
            if (!doctor) {
                throw new common_1.NotFoundException(`Doctor con ID ${id} no encontrado.`);
            }
            if (doctor.status === newStatus) {
                throw new common_1.BadRequestException(`El doctor ya se encuentra en estado: ${newStatus}`);
            }
            if (newStatus === doctorStatus_enum_1.Doctor_Status.REJECTED) {
                if (!rejectionReason || rejectionReason.trim() === '') {
                    throw new common_1.BadRequestException('Se requiere un motivo para rechazar al doctor.');
                }
                doctor.rejectedReason = rejectionReason.trim();
            }
            else if (newStatus === doctorStatus_enum_1.Doctor_Status.ACTIVE) {
                doctor.rejectedReason = null;
            }
            doctor.status = newStatus;
            await this.doctorRepository.save(doctor);
            return {
                message: `Estado del doctor actualizado a: ${newStatus}`
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.BadRequestException) {
                throw error;
            }
            console.error('Error al actualizar estado del doctor:', error);
            throw new common_1.InternalServerErrorException('Error al actualizar el estado.');
        }
    }
    async getDoctorDocuments(id) {
        try {
            const doctor = await this.doctorRepository
                .createQueryBuilder('doctor')
                .leftJoinAndSelect('doctor.documents', 'documents')
                .leftJoin('doctor.specialities', 'specialities')
                .where('doctor.id = :id', { id })
                .select([
                'doctor',
                'documents',
                'specialities.id',
                'specialities.name',
                'specialities.description'
            ])
                .getOne();
            if (!doctor) {
                throw new apiError_helper_1.ApiError(apiStatus_enum_1.ApiStatusEnum.USER_NOT_FOUND, common_1.NotFoundException);
            }
            const signedUrlPromises = doctor.documents.map(async (doc) => {
                const signedUrl = await this.uploadService.generateSignedUrl(doc.url);
                return {
                    ...doc,
                    url: signedUrl
                };
            });
            const documentsWithSignedUrls = await Promise.all(signedUrlPromises);
            return {
                ...doctor,
                documents: documentsWithSignedUrls
            };
        }
        catch (error) {
            console.error('Error al generar URLs firmadas:', error);
            throw new common_1.InternalServerErrorException('Error al obtener el perfil del doctor.');
        }
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(doctor_entity_1.Doctor)),
    __param(3, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        email_service_1.EmailService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        upload_service_1.UploadService])
], AdminService);
//# sourceMappingURL=admin.service.js.map