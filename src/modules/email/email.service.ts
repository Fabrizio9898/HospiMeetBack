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

  async sendPasswordResetEmail(email: string, fullname: string, token: string) {
    const frontendUrl =
    this.configService.get<string>('FRONTEND_URL')
    const resetLink = `${frontendUrl}/reset-password?token=${token}`;
    const subject = 'Recuperación de Contraseña';
    const html = `
      <h1>Hola, ${fullname}</h1>
      <p>Has solicitado restablecer tu contraseña.</p>
      <p>Haz click en el siguiente enlace para crear una nueva contraseña (expira en 1 hora):</p>
      <a href="${resetLink}" style="padding: 10px 20px; background-color: blue; color: white; text-decoration: none; border-radius: 5px;">Restablecer Contraseña</a>
      <p>Si no solicitaste esto, ignora este correo.</p>
    `;

    const messageData = {
      from: this.fromEmail,
      to: email,
      subject: subject,
      html: html
    };

    try {
      await this.mg.messages.create(this.domain, messageData);
      return true;
    } catch (error) {
      console.error('Error enviando email de reset:', error);
      throw error; // O maneja el error como prefieras
    }
  }
}
