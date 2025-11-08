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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDoctorDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateDoctorDto {
    email;
    password;
    fullname;
    dni;
    medicalLicenseNumber;
    phoneNumber;
}
exports.CreateDoctorDto = CreateDoctorDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'TomHoward@mail.com'
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'Email inválido' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'password', example: 'Password123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(8),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'fullname', example: 'fabrizio andrade' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100),
    (0, class_validator_1.Matches)(/^[a-zA-Z\s]+$/, {
        message: 'El nombre solo puede contener letras y espacios'
    }),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "fullname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'dni', example: '43522469' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(20),
    (0, class_validator_1.Matches)(/^\d{7,8}$/, { message: 'DNI debe ser 7-8 dígitos' }),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "dni", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'medicalLicenseNumber', example: '1243526' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.Matches)(/^[A-Z0-9-]{5,20}$/, {
        message: 'Matrícula inválida (letras/números/guiones)'
    }),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "medicalLicenseNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'phoneNumber', example: '+5491112345678' }),
    (0, class_validator_1.IsPhoneNumber)('AR'),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "phoneNumber", void 0);
//# sourceMappingURL=create-doctor.dto.js.map