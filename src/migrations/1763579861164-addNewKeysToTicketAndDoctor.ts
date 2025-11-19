import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewKeysToTicketAndDoctor1763579861164 implements MigrationInterface {
    name = 'AddNewKeysToTicketAndDoctor1763579861164'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctors" ADD "strikes" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`CREATE TYPE "public"."support_tickets_reason_enum" AS ENUM('Profesional ausente (No se conectó)', 'Paciente ausente (No se conectó)', 'Solicitud de cambio de horario / Reagendar', 'Problemas para cancelar el turno', 'Error al agendar / Confusión de fecha', 'Pago realizado pero turno no confirmado', 'Cobro duplicado en tarjeta', 'Solicitud de reembolso (General)', 'Solicitud de Factura A / B', 'Error al procesar tarjeta / Pago rechazado', 'Falla de Audio/Video durante la consulta', 'Se cortó la conexión / Llamada interrumpida', 'La App se cierra sola / Error crítico', 'No recibí el link o notificación', 'No puedo iniciar sesión / Olvidé contraseña', 'Error al actualizar datos del perfil', 'Problemas con la validación de identidad', 'Solicitud de eliminación de cuenta', 'Comportamiento ofensivo / Acoso', 'Mala atención médica / Falta de ética', 'Posible suplantación de identidad / Perfil falso', 'Intento de estafa o Spam', 'Consulta general / Dudas', 'Otro motivo no listado')`);
        await queryRunner.query(`ALTER TABLE "support_tickets" ADD "reason" "public"."support_tickets_reason_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "support_tickets" DROP COLUMN "reason"`);
        await queryRunner.query(`DROP TYPE "public"."support_tickets_reason_enum"`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "strikes"`);
    }

}
