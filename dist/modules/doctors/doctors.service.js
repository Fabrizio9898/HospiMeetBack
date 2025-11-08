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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const doctor_entity_1 = require("../../entities/doctor.entity");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const apiError_helper_1 = require("../../helpers/apiError.helper");
const apiStatus_enum_1 = require("../../enums/apiStatus.enum");
const doctorStatus_enum_1 = require("../../enums/doctorStatus.enum");
let DoctorsService = class DoctorsService {
    doctorRepository;
    constructor(doctorRepository) {
        this.doctorRepository = doctorRepository;
    }
    async create(createDoctorDto) {
        try {
            const { email, password, ...restUser } = createDoctorDto;
            const lower_email = email.toLowerCase();
            const existingUser = await this.getByEmail(lower_email);
            if (existingUser) {
                throw new apiError_helper_1.ApiError(apiStatus_enum_1.ApiStatusEnum.MAIL_IN_USE, common_1.BadRequestException);
            }
            const hashed_password = await bcrypt.hash(password, 10);
            if (!hashed_password) {
                throw new apiError_helper_1.ApiError(apiStatus_enum_1.ApiStatusEnum.HASHING_FAILED, common_1.BadRequestException);
            }
            const createdUser = this.doctorRepository.create({
                ...restUser,
                status: doctorStatus_enum_1.Doctor_Status.INACTIVE,
                email: lower_email,
                password: hashed_password
            });
            await this.doctorRepository.save(createdUser);
            return createdUser;
        }
        catch (error) {
            if (error instanceof apiError_helper_1.ApiError) {
                throw error;
            }
            throw new apiError_helper_1.ApiError(error?.message, common_1.InternalServerErrorException, error);
        }
    }
    async getByEmail(email) {
        const found = await this.doctorRepository.findOne({
            where: { email: email }
        });
        return found || undefined;
    }
    update(id, updateDoctorDto) {
        return `This action updates a #${id} doctor`;
    }
};
exports.DoctorsService = DoctorsService;
exports.DoctorsService = DoctorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(doctor_entity_1.Doctor)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DoctorsService);
//# sourceMappingURL=doctors.service.js.map