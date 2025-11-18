import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';

@Injectable()
export class EmailService {
  private mg: any;
  private domain: string;
  private fromEmail: string;

  constructor(private configService: ConfigService) {
    // 1. Configura el cliente de Mailgun en el constructor
    const mailgun = new Mailgun(FormData);
    this.mg = mailgun.client({
      username: 'api',
      key: this.configService.get<string>('MAILGUN_API_KEY')
    });

    this.domain = this.configService.get<string>('MAILGUN_DOMAIN');
    this.fromEmail = this.configService.get<string>('MAILGUN_FROM_EMAIL');
  }

  /**
   * Esta es la función que llamará tu AdminService
   */
  async sendAdminWelcomeEmail(
    email: string,
    fullname: string,
    tempPassword: string
  ) {
    const subject = '¡Bienvenido a Tu App!';
    const html = `
      <h1>¡Hola, ${fullname}!</h1>
      <p>Has sido invitado como Administrador.</p>
      <p>Tus credenciales:</p>
      <ul>
        <li><strong>Usuario:</strong> ${email}</li>
        <li><strong>Contraseña Temporal:</strong> ${tempPassword}</li>
      </ul>
      <p>Inicia sesión y cambia tu contraseña.</p>
    `;

    // 2. Prepara los datos del mensaje
    const messageData = {
      from: this.fromEmail,
      to: email, // El email del nuevo admin
      subject: subject,
      html: html // O usa 'text' para texto plano
    };

    // 3. Envía el email
    try {
      const data = await this.mg.messages.create(this.domain, messageData);
      console.log('Email enviado:', data);
      return data;
    } catch (error) {
      console.error('Error al enviar email:', error);
      throw error;
    }
  }
}
