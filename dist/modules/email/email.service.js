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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const form_data_1 = __importDefault(require("form-data"));
const mailgun_js_1 = __importDefault(require("mailgun.js"));
let EmailService = class EmailService {
    configService;
    mg;
    domain;
    fromEmail;
    constructor(configService) {
        this.configService = configService;
        const mailgun = new mailgun_js_1.default(form_data_1.default);
        this.mg = mailgun.client({
            username: 'api',
            key: this.configService.get('MAILGUN_API_KEY')
        });
        this.domain = this.configService.get('MAILGUN_DOMAIN');
        this.fromEmail = this.configService.get('MAILGUN_FROM_EMAIL');
    }
    async sendAdminWelcomeEmail(email, name, tempPassword) {
        const subject = '¡Bienvenido a Tu App!';
        const html = `
      <h1>¡Hola, ${name}!</h1>
      <p>Has sido invitado como Administrador.</p>
      <p>Tus credenciales:</p>
      <ul>
        <li><strong>Usuario:</strong> ${email}</li>
        <li><strong>Contraseña Temporal:</strong> ${tempPassword}</li>
      </ul>
      <p>Inicia sesión y cambia tu contraseña.</p>
    `;
        const messageData = {
            from: this.fromEmail,
            to: email,
            subject: subject,
            html: html
        };
        try {
            const data = await this.mg.messages.create(this.domain, messageData);
            console.log('Email enviado:', data);
            return data;
        }
        catch (error) {
            console.error('Error al enviar email:', error);
            throw error;
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map