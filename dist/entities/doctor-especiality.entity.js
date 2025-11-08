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
exports.DoctorSpeciality = void 0;
const typeorm_1 = require("typeorm");
const doctor_entity_1 = require("./doctor.entity");
let DoctorSpeciality = class DoctorSpeciality {
    id;
    name;
    description;
    doctors;
    createdAt;
    updatedAt;
};
exports.DoctorSpeciality = DoctorSpeciality;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], DoctorSpeciality.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, unique: true }),
    __metadata("design:type", String)
], DoctorSpeciality.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], DoctorSpeciality.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => doctor_entity_1.Doctor, (doctor) => doctor.specialities),
    __metadata("design:type", Array)
], DoctorSpeciality.prototype, "doctors", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DoctorSpeciality.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], DoctorSpeciality.prototype, "updatedAt", void 0);
exports.DoctorSpeciality = DoctorSpeciality = __decorate([
    (0, typeorm_1.Entity)('doctor_specialities')
], DoctorSpeciality);
//# sourceMappingURL=doctor-especiality.entity.js.map