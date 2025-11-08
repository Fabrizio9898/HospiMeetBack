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
exports.Appointment = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const doctor_entity_1 = require("./doctor.entity");
const user_payment_entity_1 = require("./user-payment.entity");
const doctor_schedules_entity_1 = require("./doctor-schedules.entity");
const appointment_enum_1 = require("../enums/appointment.enum");
const payoutStatus_enum_1 = require("../enums/payoutStatus.enum");
let Appointment = class Appointment {
    id;
    dateHour;
    status;
    cost;
    payoutStatus;
    user;
    doctor;
    schedule;
    pago;
    createdAt;
    updatedAt;
};
exports.Appointment = Appointment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Appointment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Appointment.prototype, "dateHour", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: appointment_enum_1.AppointmentStatus,
        default: appointment_enum_1.AppointmentStatus.PENDING
    }),
    __metadata("design:type", String)
], Appointment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Appointment.prototype, "cost", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: payoutStatus_enum_1.PayoutStatus, default: payoutStatus_enum_1.PayoutStatus.UNPAID }),
    __metadata("design:type", String)
], Appointment.prototype, "payoutStatus", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (usuario) => usuario.appointments, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", user_entity_1.User)
], Appointment.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => doctor_entity_1.Doctor, (doctor) => doctor.appointments, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", doctor_entity_1.Doctor)
], Appointment.prototype, "doctor", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => doctor_schedules_entity_1.DoctorSchedule, (schedule) => schedule.appointment, {
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)({ name: 'scheduleId' }),
    __metadata("design:type", doctor_schedules_entity_1.DoctorSchedule)
], Appointment.prototype, "schedule", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_payment_entity_1.UserPayment, (pago) => pago.turno),
    __metadata("design:type", user_payment_entity_1.UserPayment)
], Appointment.prototype, "pago", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Appointment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Appointment.prototype, "updatedAt", void 0);
exports.Appointment = Appointment = __decorate([
    (0, typeorm_1.Entity)('apointments')
], Appointment);
//# sourceMappingURL=appointment.entity.js.map