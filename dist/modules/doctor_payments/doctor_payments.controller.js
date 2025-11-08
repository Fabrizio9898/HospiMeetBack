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
exports.DoctorPaymentsController = void 0;
const common_1 = require("@nestjs/common");
const doctor_payments_service_1 = require("./doctor_payments.service");
const create_doctor_payment_dto_1 = require("./dto/create-doctor_payment.dto");
const update_doctor_payment_dto_1 = require("./dto/update-doctor_payment.dto");
let DoctorPaymentsController = class DoctorPaymentsController {
    doctorPaymentsService;
    constructor(doctorPaymentsService) {
        this.doctorPaymentsService = doctorPaymentsService;
    }
    create(createDoctorPaymentDto) {
        return this.doctorPaymentsService.create(createDoctorPaymentDto);
    }
    findAll() {
        return this.doctorPaymentsService.findAll();
    }
    findOne(id) {
        return this.doctorPaymentsService.findOne(+id);
    }
    update(id, updateDoctorPaymentDto) {
        return this.doctorPaymentsService.update(+id, updateDoctorPaymentDto);
    }
    remove(id) {
        return this.doctorPaymentsService.remove(+id);
    }
};
exports.DoctorPaymentsController = DoctorPaymentsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_doctor_payment_dto_1.CreateDoctorPaymentDto]),
    __metadata("design:returntype", void 0)
], DoctorPaymentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DoctorPaymentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DoctorPaymentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_doctor_payment_dto_1.UpdateDoctorPaymentDto]),
    __metadata("design:returntype", void 0)
], DoctorPaymentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DoctorPaymentsController.prototype, "remove", null);
exports.DoctorPaymentsController = DoctorPaymentsController = __decorate([
    (0, common_1.Controller)('doctor-payments'),
    __metadata("design:paramtypes", [doctor_payments_service_1.DoctorPaymentsService])
], DoctorPaymentsController);
//# sourceMappingURL=doctor_payments.controller.js.map