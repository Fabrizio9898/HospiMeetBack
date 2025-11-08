"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const create_admin_dto_1 = require("./dto/create-admin.dto");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
const roles_enum_1 = require("../../enums/roles.enum");
const auth_guard_1 = require("../../guards/auth.guard");
const login_dto_1 = require("../../dtos/login.dto");
const doctorQuery_dto_1 = require("./dto/doctorQuery.dto");
const class_transformer_1 = require("class-transformer");
const doctorResponse_dto_1 = require("./dto/doctorResponse.dto");
const updateDoctorStatus_dto_1 = require("./dto/updateDoctorStatus.dto");
let AdminController = class AdminController {
    adminService;
    constructor(adminService) {
        this.adminService = adminService;
    }
    async create(createAdminDto) {
        return await this.adminService.create(createAdminDto);
    }
    async login(data) {
        return await this.adminService.login(data);
    }
    async getDoctors(doctorQuery) {
        const response = await this.adminService.getDoctors(doctorQuery);
        return (0, class_transformer_1.plainToInstance)(doctorResponse_dto_1.DoctorListResponseDto, response);
    }
    async getKpis() {
        return await this.adminService.getDashboardKpis();
    }
    async getDoctorDocuments(id) {
        return await this.adminService.getDoctorDocuments(id);
    }
    async updateDoctorStatus(id, updateStatusDto) {
        return await this.adminService.rejectOrApproveDoctors(id, updateStatusDto);
    }
    async verifyDocument(id, updateStatusDto) {
        return await this.adminService.rejectOrApproveDoctors(id, updateStatusDto);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Post)('register'),
    (0, roles_decorator_1.Roles)(roles_enum_1.UserRole.SUPER_ADMIN),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({ type: create_admin_dto_1.CreateAdminDto }),
    (0, swagger_1.ApiOperation)({
        summary: 'Registro de administrador, debe ser ejecutado por el super admin.'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('doctors'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        transform: true,
        whitelist: true
    })),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [doctorQuery_dto_1.GetDoctorsQueryDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getDoctors", null);
__decorate([
    (0, common_1.Get)('dashboard/kpis'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getKpis", null);
__decorate([
    (0, common_1.Get)('doctor-documents/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)(roles_enum_1.UserRole.ADMIN, roles_enum_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getDoctorDocuments", null);
__decorate([
    (0, common_1.Patch)('doctors/:id/status'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateDoctorStatus_dto_1.UpdateDoctorStatusDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateDoctorStatus", null);
__decorate([
    (0, common_1.Patch)('doctors/:id/status'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateDoctorStatus_dto_1.UpdateDoctorStatusDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "verifyDocument", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map