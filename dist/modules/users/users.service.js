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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../entities/user.entity");
const typeorm_2 = require("typeorm");
const apiError_helper_1 = require("../../helpers/apiError.helper");
const apiStatus_enum_1 = require("../../enums/apiStatus.enum");
const bcrypt = __importStar(require("bcrypt"));
const class_validator_1 = require("class-validator");
let UsersService = class UsersService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        try {
            const { email, password, ...restUser } = createUserDto;
            const lower_email = email.toLowerCase();
            const existingUser = await this.getUserByMail(lower_email);
            if (existingUser) {
                throw new apiError_helper_1.ApiError(apiStatus_enum_1.ApiStatusEnum.MAIL_IN_USE, common_1.BadRequestException);
            }
            const hashed_password = await bcrypt.hash(password, 10);
            if (!hashed_password) {
                throw new apiError_helper_1.ApiError(apiStatus_enum_1.ApiStatusEnum.HASHING_FAILED, common_1.BadRequestException);
            }
            const createdUser = this.userRepository.create({
                ...restUser,
                email: lower_email,
                password: hashed_password
            });
            await this.userRepository.save(createdUser);
            return createdUser;
        }
        catch (error) {
            if (error instanceof apiError_helper_1.ApiError) {
                throw error;
            }
            throw new apiError_helper_1.ApiError(error?.message, common_1.InternalServerErrorException, error);
        }
    }
    findAll() {
        return `This action returns all users`;
    }
    async getById(id) {
        try {
            return await this.userRepository
                .createQueryBuilder('user')
                .where('user.id = :id', { id: id })
                .getOneOrFail();
        }
        catch (error) {
            if (error instanceof typeorm_2.EntityNotFoundError) {
                throw new apiError_helper_1.ApiError(apiStatus_enum_1.ApiStatusEnum.USER_NOT_FOUND, common_1.NotFoundException);
            }
            throw new apiError_helper_1.ApiError(error?.message, common_1.InternalServerErrorException, error);
        }
    }
    async updateEmail(id, updateUser) {
        try {
            const { email } = updateUser;
            const found_user = await this.userRepository.findOneBy({
                id
            });
            if ((0, class_validator_1.isEmpty)(found_user)) {
                throw new apiError_helper_1.ApiError(apiStatus_enum_1.ApiStatusEnum.USER_NOT_FOUND, common_1.NotFoundException);
            }
            if (updateUser.email) {
                const email_existed = await this.getUserByMail(email);
                if (email_existed && email_existed.id !== found_user.id) {
                    throw new apiError_helper_1.ApiError(apiStatus_enum_1.ApiStatusEnum.EMAIL_ALREADY_IN_USE, common_1.BadRequestException);
                }
            }
            const merged_user = this.userRepository.merge(found_user, updateUser);
            return await this.userRepository.save(merged_user);
        }
        catch (error) {
            if (error instanceof apiError_helper_1.ApiError) {
                throw error;
            }
            throw new apiError_helper_1.ApiError(error?.message, common_1.InternalServerErrorException, error);
        }
    }
    async getUserByMail(email) {
        try {
            const found = await this.userRepository.findOne({
                where: { email: email.toLowerCase() }
            });
            return found || undefined;
        }
        catch (error) {
            throw new apiError_helper_1.ApiError(error?.message, common_1.InternalServerErrorException, error);
        }
    }
    async updatePassword(id, updateUser) {
        try {
            const { actual_password, newPassword, confirm_password } = updateUser;
            const user = await this.userRepository
                .createQueryBuilder('user')
                .addSelect('user.password')
                .where('user.id = :id', { id })
                .getOne();
            if (!user) {
                throw new apiError_helper_1.ApiError(apiStatus_enum_1.ApiStatusEnum.USER_NOT_FOUND, common_1.NotFoundException);
            }
            const isActualPasswordMatch = await bcrypt.compare(actual_password, user.password);
            if (!isActualPasswordMatch) {
                throw new apiError_helper_1.ApiError(apiStatus_enum_1.ApiStatusEnum.INVALID_CREDENTIALS, common_1.UnauthorizedException);
            }
            if (newPassword !== confirm_password) {
                throw new apiError_helper_1.ApiError(apiStatus_enum_1.ApiStatusEnum.PASSWORDS_DONT_MATCH, common_1.BadRequestException);
            }
            const is_same_password = await bcrypt.compare(newPassword, user.password);
            if (is_same_password) {
                throw new apiError_helper_1.ApiError(apiStatus_enum_1.ApiStatusEnum.PASSWORD_SAME_AS_OLD, common_1.BadRequestException);
            }
            const hashed_password = await bcrypt.hash(newPassword, 10);
            if (!hashed_password) {
                throw new apiError_helper_1.ApiError(apiStatus_enum_1.ApiStatusEnum.HASHING_FAILED, common_1.BadRequestException);
            }
            const merged_user = this.userRepository.merge(user, {
                password: hashed_password
            });
            return await this.userRepository.save(merged_user);
        }
        catch (error) {
            if (error instanceof apiError_helper_1.ApiError) {
                throw error;
            }
            throw new apiError_helper_1.ApiError(error?.message, common_1.InternalServerErrorException, error);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map