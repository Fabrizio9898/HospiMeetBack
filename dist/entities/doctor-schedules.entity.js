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
exports.DoctorSchedule = void 0;
const typeorm_1 = require("typeorm");
const doctor_entity_1 = require("./doctor.entity");
const appointment_entity_1 = require("./appointment.entity");
const doctor_schedule_enum_1 = require("../enums/doctor-schedule.enum");
let DoctorSchedule = class DoctorSchedule {
    id;
    horaInicio;
    horaFin;
    fecha;
    estado;
    doctor;
    appointment;
    createdAt;
    updatedAt;
};
exports.DoctorSchedule = DoctorSchedule;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DoctorSchedule.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], DoctorSchedule.prototype, "horaInicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], DoctorSchedule.prototype, "horaFin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], DoctorSchedule.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: doctor_schedule_enum_1.DoctorScheduleStatus,
        default: doctor_schedule_enum_1.DoctorScheduleStatus.AVAILABLE
    }),
    __metadata("design:type", String)
], DoctorSchedule.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => doctor_entity_1.Doctor, (doctor) => doctor.schedules, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", doctor_entity_1.Doctor)
], DoctorSchedule.prototype, "doctor", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => appointment_entity_1.Appointment, (appointment) => appointment.schedule),
    __metadata("design:type", appointment_entity_1.Appointment)
], DoctorSchedule.prototype, "appointment", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DoctorSchedule.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], DoctorSchedule.prototype, "updatedAt", void 0);
exports.DoctorSchedule = DoctorSchedule = __decorate([
    (0, typeorm_1.Entity)('doctor_schedules')
], DoctorSchedule);
//# sourceMappingURL=doctor-schedules.entity.js.map