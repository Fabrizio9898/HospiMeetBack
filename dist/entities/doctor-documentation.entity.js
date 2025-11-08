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
exports.DoctorDocument = void 0;
const typeorm_1 = require("typeorm");
const doctor_entity_1 = require("./doctor.entity");
const doctorDocument_enum_1 = require("../enums/doctorDocument.enum");
let DoctorDocument = class DoctorDocument {
    id;
    type;
    url;
    verified;
    doctor;
    uploadedAt;
};
exports.DoctorDocument = DoctorDocument;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DoctorDocument.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: doctorDocument_enum_1.DoctorDocumentType }),
    __metadata("design:type", String)
], DoctorDocument.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500 }),
    __metadata("design:type", String)
], DoctorDocument.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], DoctorDocument.prototype, "verified", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => doctor_entity_1.Doctor, (doctor) => doctor.documents),
    __metadata("design:type", doctor_entity_1.Doctor)
], DoctorDocument.prototype, "doctor", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DoctorDocument.prototype, "uploadedAt", void 0);
exports.DoctorDocument = DoctorDocument = __decorate([
    (0, typeorm_1.Entity)('doctor_documents')
], DoctorDocument);
//# sourceMappingURL=doctor-documentation.entity.js.map