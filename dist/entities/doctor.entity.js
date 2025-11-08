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
exports.Doctor = void 0;
const typeorm_1 = require("typeorm");
const doctor_schedules_entity_1 = require("./doctor-schedules.entity");
const appointment_entity_1 = require("./appointment.entity");
const review_entity_1 = require("./review.entity");
const doctor_payment_entity_1 = require("./doctor-payment.entity");
const doctor_especiality_entity_1 = require("./doctor-especiality.entity");
const doctor_availability_entity_1 = require("./doctor-availability.entity");
const doctorStatus_enum_1 = require("../enums/doctorStatus.enum");
const doctor_documentation_entity_1 = require("./doctor-documentation.entity");
const roles_enum_1 = require("../enums/roles.enum");
let Doctor = class Doctor {
    id;
    profile_image;
    email;
    password;
    fullname;
    dni;
    medicalLicenseNumber;
    status;
    phoneNumber;
    tarifaPorConsulta;
    role;
    rejectedReason;
    documents;
    schedules;
    appointments;
    reviews;
    pagosHonorarios;
    disponibilidades;
    specialities;
    createdAt;
    updatedAt;
};
exports.Doctor = Doctor;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Doctor.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 'https://res.cloudinary.com/dvgvcleky/image/upload/f_auto,q_auto/v1/RestO/ffgx6ywlaix0mb3jghux'
    }),
    __metadata("design:type", String)
], Doctor.prototype, "profile_image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, unique: true }),
    __metadata("design:type", String)
], Doctor.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Doctor.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Doctor.prototype, "fullname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, unique: true }),
    __metadata("design:type", String)
], Doctor.prototype, "dni", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true }),
    __metadata("design:type", String)
], Doctor.prototype, "medicalLicenseNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: doctorStatus_enum_1.Doctor_Status,
        default: doctorStatus_enum_1.Doctor_Status.INACTIVE
    }),
    __metadata("design:type", String)
], Doctor.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Doctor.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Doctor.prototype, "tarifaPorConsulta", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: roles_enum_1.UserRole, default: roles_enum_1.UserRole.DOCTOR }),
    __metadata("design:type", String)
], Doctor.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Doctor.prototype, "rejectedReason", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => doctor_documentation_entity_1.DoctorDocument, (doc) => doc.doctor, { cascade: true }),
    __metadata("design:type", Array)
], Doctor.prototype, "documents", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => doctor_schedules_entity_1.DoctorSchedule, (horario) => horario.doctor),
    __metadata("design:type", Array)
], Doctor.prototype, "schedules", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => appointment_entity_1.Appointment, (turno) => turno.doctor),
    __metadata("design:type", Array)
], Doctor.prototype, "appointments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.Review, (review) => review.doctor),
    __metadata("design:type", Array)
], Doctor.prototype, "reviews", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => doctor_payment_entity_1.DoctorPayment, (pago) => pago.doctor),
    __metadata("design:type", Array)
], Doctor.prototype, "pagosHonorarios", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => doctor_availability_entity_1.DoctorAvailability, (disp) => disp.doctor),
    __metadata("design:type", Array)
], Doctor.prototype, "disponibilidades", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => doctor_especiality_entity_1.DoctorSpeciality, (especialidad) => especialidad.doctors),
    (0, typeorm_1.JoinTable)({
        name: 'doctors_specialities',
        joinColumn: { name: 'doctorId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'specialityId', referencedColumnName: 'id' }
    }),
    __metadata("design:type", Array)
], Doctor.prototype, "specialities", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Doctor.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Doctor.prototype, "updatedAt", void 0);
exports.Doctor = Doctor = __decorate([
    (0, typeorm_1.Entity)('doctors')
], Doctor);
//# sourceMappingURL=doctor.entity.js.map