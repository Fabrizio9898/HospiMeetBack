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
exports.SupportTicket = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const ticketPriority_enum_1 = require("../enums/tickets/ticketPriority.enum");
const ticketCategory_enum_1 = require("../enums/tickets/ticketCategory.enum");
const appointment_entity_1 = require("./appointment.entity");
const ticketStatus_enum_1 = require("../enums/tickets/ticketStatus.enum");
const doctor_entity_1 = require("./doctor.entity");
const roles_enum_1 = require("../enums/roles.enum");
let SupportTicket = class SupportTicket {
    id;
    patient;
    doctor;
    reporterRole;
    appointment;
    category;
    priority;
    subject;
    description;
    attachmentUrl;
    status;
    adminResponse;
    internalNotes;
    createdAt;
    updatedAt;
};
exports.SupportTicket = SupportTicket;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SupportTicket.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.supportTickets, { nullable: true }),
    __metadata("design:type", user_entity_1.User)
], SupportTicket.prototype, "patient", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => doctor_entity_1.Doctor, (doctor) => doctor.supportTickets, {
        nullable: true
    }),
    __metadata("design:type", doctor_entity_1.Doctor)
], SupportTicket.prototype, "doctor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: roles_enum_1.UserRole }),
    __metadata("design:type", String)
], SupportTicket.prototype, "reporterRole", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => appointment_entity_1.Appointment, (appointment) => appointment.supportTickets, { nullable: true }),
    __metadata("design:type", appointment_entity_1.Appointment)
], SupportTicket.prototype, "appointment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ticketCategory_enum_1.TicketCategory }),
    __metadata("design:type", String)
], SupportTicket.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ticketPriority_enum_1.TicketPriority,
        default: ticketPriority_enum_1.TicketPriority.MEDIUM
    }),
    __metadata("design:type", String)
], SupportTicket.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SupportTicket.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], SupportTicket.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'attachment_url', nullable: true }),
    __metadata("design:type", String)
], SupportTicket.prototype, "attachmentUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ticketStatus_enum_1.TicketStatus, default: ticketStatus_enum_1.TicketStatus.OPEN }),
    __metadata("design:type", String)
], SupportTicket.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'admin_response', type: 'text', nullable: true }),
    __metadata("design:type", String)
], SupportTicket.prototype, "adminResponse", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'internal_notes', type: 'text', nullable: true }),
    __metadata("design:type", String)
], SupportTicket.prototype, "internalNotes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], SupportTicket.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], SupportTicket.prototype, "updatedAt", void 0);
exports.SupportTicket = SupportTicket = __decorate([
    (0, typeorm_1.Entity)('support_tickets')
], SupportTicket);
//# sourceMappingURL=supportTickets.entity.js.map