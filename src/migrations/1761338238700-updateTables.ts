import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTables1761338238700 implements MigrationInterface {
    name = 'UpdateTables1761338238700'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_payments" DROP CONSTRAINT "FK_fe3511a35b04e2e7cc02faf1d30"`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" DROP CONSTRAINT "FK_d11c5bcc68435afa26784c0cc2c"`);
        await queryRunner.query(`ALTER TABLE "apointments" DROP COLUMN "fechaHora"`);
        await queryRunner.query(`ALTER TABLE "apointments" DROP COLUMN "estado"`);
        await queryRunner.query(`DROP TYPE "public"."apointments_estado_enum"`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" DROP COLUMN "montoBruto"`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" DROP COLUMN "comisionPorcentaje"`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" DROP COLUMN "pagoId"`);
        await queryRunner.query(`ALTER TABLE "apointments" ADD "dateHour" TIMESTAMP NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."apointments_status_enum" AS ENUM('pending', 'confirmed', 'completed', 'cancelled')`);
        await queryRunner.query(`ALTER TABLE "apointments" ADD "status" "public"."apointments_status_enum" NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE "apointments" ADD "cost" numeric(10,2) NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."apointments_payoutstatus_enum" AS ENUM('UNPAID', 'PAID')`);
        await queryRunner.query(`ALTER TABLE "apointments" ADD "payoutStatus" "public"."apointments_payoutstatus_enum" NOT NULL DEFAULT 'UNPAID'`);
        await queryRunner.query(`CREATE TYPE "public"."doctor_payments_status_enum" AS ENUM('processing', 'completed', 'failed')`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" ADD "status" "public"."doctor_payments_status_enum" NOT NULL DEFAULT 'processing'`);
        await queryRunner.query(`ALTER TABLE "user_payments" ALTER COLUMN "turnoId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_payments" ADD CONSTRAINT "UQ_fe3511a35b04e2e7cc02faf1d30" UNIQUE ("turnoId")`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" DROP CONSTRAINT "FK_995a1c917cd6393f8c2962e2015"`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" ALTER COLUMN "doctorId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_payments" ADD CONSTRAINT "FK_fe3511a35b04e2e7cc02faf1d30" FOREIGN KEY ("turnoId") REFERENCES "apointments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" ADD CONSTRAINT "FK_995a1c917cd6393f8c2962e2015" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctor_payments" DROP CONSTRAINT "FK_995a1c917cd6393f8c2962e2015"`);
        await queryRunner.query(`ALTER TABLE "user_payments" DROP CONSTRAINT "FK_fe3511a35b04e2e7cc02faf1d30"`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" ALTER COLUMN "doctorId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" ADD CONSTRAINT "FK_995a1c917cd6393f8c2962e2015" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_payments" DROP CONSTRAINT "UQ_fe3511a35b04e2e7cc02faf1d30"`);
        await queryRunner.query(`ALTER TABLE "user_payments" ALTER COLUMN "turnoId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."doctor_payments_status_enum"`);
        await queryRunner.query(`ALTER TABLE "apointments" DROP COLUMN "payoutStatus"`);
        await queryRunner.query(`DROP TYPE "public"."apointments_payoutstatus_enum"`);
        await queryRunner.query(`ALTER TABLE "apointments" DROP COLUMN "cost"`);
        await queryRunner.query(`ALTER TABLE "apointments" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."apointments_status_enum"`);
        await queryRunner.query(`ALTER TABLE "apointments" DROP COLUMN "dateHour"`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" ADD "pagoId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" ADD "estado" character varying(50) NOT NULL DEFAULT 'pendiente'`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" ADD "comisionPorcentaje" numeric(10,2) NOT NULL DEFAULT 0.1`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" ADD "montoBruto" numeric(10,2) NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."apointments_estado_enum" AS ENUM('pending', 'confirmed', 'completed', 'cancelled')`);
        await queryRunner.query(`ALTER TABLE "apointments" ADD "estado" "public"."apointments_estado_enum" NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE "apointments" ADD "fechaHora" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" ADD CONSTRAINT "FK_d11c5bcc68435afa26784c0cc2c" FOREIGN KEY ("pagoId") REFERENCES "user_payments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_payments" ADD CONSTRAINT "FK_fe3511a35b04e2e7cc02faf1d30" FOREIGN KEY ("turnoId") REFERENCES "apointments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
