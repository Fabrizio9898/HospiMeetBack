import { MigrationInterface, QueryRunner } from "typeorm";

export class Reestructuracion1764028488058 implements MigrationInterface {
    name = 'Reestructuracion1764028488058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctor_schedules" DROP CONSTRAINT "FK_238680c7cf4a83dc020a7c824c5"`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" DROP CONSTRAINT "FK_995a1c917cd6393f8c2962e2015"`);
        await queryRunner.query(`ALTER TABLE "doctor_weekly_availability" DROP CONSTRAINT "FK_6aff20dc95d6d2c53a706f6fcad"`);
        await queryRunner.query(`ALTER TABLE "doctor_documents" DROP CONSTRAINT "FK_a92fa2c0f4b73fc5e9abd3f5e4e"`);
        await queryRunner.query(`ALTER TABLE "support_tickets" DROP CONSTRAINT "FK_d39e5488a1cbfd3885d5defddec"`);
        await queryRunner.query(`ALTER TABLE "support_tickets" DROP CONSTRAINT "FK_ee4836523357e2602737661bed5"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_48844829b281251e1eb314acffb"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP CONSTRAINT "FK_c39435c71c0fff03449eb6b2332"`);
        await queryRunner.query(`ALTER TABLE "apointments" DROP CONSTRAINT "FK_bc559aa20eff48268f32bb900ab"`);
        await queryRunner.query(`ALTER TABLE "doctors_specialities" DROP CONSTRAINT "FK_30c079ac33bb8669929bca5b1e7"`);
        await queryRunner.query(`ALTER TABLE "patients" RENAME COLUMN "name" TO "fullname"`);
        await queryRunner.query(`CREATE TYPE "public"."user_currentplan_enum" AS ENUM('FREE_TRIAL', 'BASIC', 'PREMIUM', 'ENTERPRISE')`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('pending', 'inactive', 'active', 'suspended', 'banned', 'rejected')`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('assistant', 'admin', 'super_admin', 'doctor')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "profile_image" character varying NOT NULL DEFAULT 'https://res.cloudinary.com/dvgvcleky/image/upload/f_auto,q_auto/v1/RestO/ffgx6ywlaix0mb3jghux', "email" character varying(100) NOT NULL, "password" character varying(255) NOT NULL, "fullname" character varying(100) NOT NULL, "stripeCustomerId" character varying, "currentPlan" "public"."user_currentplan_enum" NOT NULL DEFAULT 'FREE_TRIAL', "planExpiresAt" TIMESTAMP, "dni" character varying(20) NOT NULL, "medicalLicenseNumber" character varying(50), "strikes" integer NOT NULL DEFAULT '0', "status" "public"."user_status_enum" NOT NULL DEFAULT 'inactive', "reset_password_token" character varying, "reset_password_expires" TIMESTAMP, "phoneNumber" character varying(20), "tarifaPorConsulta" numeric(10,2), "role" "public"."user_role_enum" NOT NULL DEFAULT 'doctor', "rejectedReason" text, "lastPaymentDate" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_027941f32603b418d9bf0db0e82" UNIQUE ("dni"), CONSTRAINT "UQ_3916c4ccecb723702ae254c1cd2" UNIQUE ("medicalLicenseNumber"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "patient_payment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "monto" numeric(10,2) NOT NULL, "estado" character varying(50) NOT NULL DEFAULT 'pendiente', "metodoPago" character varying(100) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "turnoId" uuid, CONSTRAINT "REL_2d4c29422621018e31fe73f887" UNIQUE ("turnoId"), CONSTRAINT "PK_21b5371bf74225fa3e6e9d840c5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "support_tickets" DROP COLUMN "patientId"`);
        await queryRunner.query(`ALTER TABLE "doctor_schedules" ADD CONSTRAINT "FK_238680c7cf4a83dc020a7c824c5" FOREIGN KEY ("doctorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" ADD CONSTRAINT "FK_995a1c917cd6393f8c2962e2015" FOREIGN KEY ("doctorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctor_weekly_availability" ADD CONSTRAINT "FK_6aff20dc95d6d2c53a706f6fcad" FOREIGN KEY ("doctorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctor_documents" ADD CONSTRAINT "FK_a92fa2c0f4b73fc5e9abd3f5e4e" FOREIGN KEY ("doctorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "support_tickets" ADD CONSTRAINT "FK_d39e5488a1cbfd3885d5defddec" FOREIGN KEY ("doctorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_48844829b281251e1eb314acffb" FOREIGN KEY ("doctorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patients" ADD CONSTRAINT "FK_c39435c71c0fff03449eb6b2332" FOREIGN KEY ("doctorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "apointments" ADD CONSTRAINT "FK_bc559aa20eff48268f32bb900ab" FOREIGN KEY ("doctorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_payment" ADD CONSTRAINT "FK_2d4c29422621018e31fe73f887d" FOREIGN KEY ("turnoId") REFERENCES "apointments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctors_specialities" ADD CONSTRAINT "FK_30c079ac33bb8669929bca5b1e7" FOREIGN KEY ("doctorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctors_specialities" DROP CONSTRAINT "FK_30c079ac33bb8669929bca5b1e7"`);
        await queryRunner.query(`ALTER TABLE "patient_payment" DROP CONSTRAINT "FK_2d4c29422621018e31fe73f887d"`);
        await queryRunner.query(`ALTER TABLE "apointments" DROP CONSTRAINT "FK_bc559aa20eff48268f32bb900ab"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP CONSTRAINT "FK_c39435c71c0fff03449eb6b2332"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_48844829b281251e1eb314acffb"`);
        await queryRunner.query(`ALTER TABLE "support_tickets" DROP CONSTRAINT "FK_d39e5488a1cbfd3885d5defddec"`);
        await queryRunner.query(`ALTER TABLE "doctor_documents" DROP CONSTRAINT "FK_a92fa2c0f4b73fc5e9abd3f5e4e"`);
        await queryRunner.query(`ALTER TABLE "doctor_weekly_availability" DROP CONSTRAINT "FK_6aff20dc95d6d2c53a706f6fcad"`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" DROP CONSTRAINT "FK_995a1c917cd6393f8c2962e2015"`);
        await queryRunner.query(`ALTER TABLE "doctor_schedules" DROP CONSTRAINT "FK_238680c7cf4a83dc020a7c824c5"`);
        await queryRunner.query(`ALTER TABLE "support_tickets" ADD "patientId" uuid`);
        await queryRunner.query(`DROP TABLE "patient_payment"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_currentplan_enum"`);
        await queryRunner.query(`ALTER TABLE "patients" RENAME COLUMN "fullname" TO "name"`);
        await queryRunner.query(`ALTER TABLE "doctors_specialities" ADD CONSTRAINT "FK_30c079ac33bb8669929bca5b1e7" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "apointments" ADD CONSTRAINT "FK_bc559aa20eff48268f32bb900ab" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patients" ADD CONSTRAINT "FK_c39435c71c0fff03449eb6b2332" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_48844829b281251e1eb314acffb" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "support_tickets" ADD CONSTRAINT "FK_ee4836523357e2602737661bed5" FOREIGN KEY ("patientId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "support_tickets" ADD CONSTRAINT "FK_d39e5488a1cbfd3885d5defddec" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctor_documents" ADD CONSTRAINT "FK_a92fa2c0f4b73fc5e9abd3f5e4e" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctor_weekly_availability" ADD CONSTRAINT "FK_6aff20dc95d6d2c53a706f6fcad" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" ADD CONSTRAINT "FK_995a1c917cd6393f8c2962e2015" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctor_schedules" ADD CONSTRAINT "FK_238680c7cf4a83dc020a7c824c5" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
