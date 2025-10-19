import { MigrationInterface, QueryRunner } from "typeorm";

export class TestMigration1760838735337 implements MigrationInterface {
    name = 'TestMigration1760838735337'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "doctor_schedules" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "horaInicio" TIME NOT NULL, "horaFin" TIME NOT NULL, "fecha" date NOT NULL, "estado" "public"."doctor_schedules_estado_enum" NOT NULL DEFAULT 'available', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "doctorId" uuid, CONSTRAINT "PK_a1cab57bc0a680b50d06930b377" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "doctor_payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "montoBruto" numeric(10,2) NOT NULL, "comisionPorcentaje" numeric(10,2) NOT NULL DEFAULT '0.1', "montoNeto" numeric(10,2) NOT NULL, "estado" character varying(50) NOT NULL DEFAULT 'pendiente', "doctorId" uuid NOT NULL, "pagoId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d83a49fa23b82a7d95a1609ee98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "doctor_specialities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nombre" character varying(100) NOT NULL, "descripcion" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_657657b9eb6d9bc7812212f5828" UNIQUE ("nombre"), CONSTRAINT "PK_0beb4c018b5743e4e1566a56ab2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "doctor_weekly_availability" ("id" SERIAL NOT NULL, "diaSemana" integer NOT NULL, "horaInicio" TIME NOT NULL, "horaFin" TIME NOT NULL, "duracionCita" integer NOT NULL DEFAULT '30', "doctorId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_43831974f33714413b15ddc76f1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "doctors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(100) NOT NULL, "password" character varying(255) NOT NULL, "nombre" character varying(100) NOT NULL, "apellido" character varying(100) NOT NULL, "telefono" character varying(20) NOT NULL, "tarifaPorConsulta" numeric(10,2) NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_62069f52ebba471c91de5d59d61" UNIQUE ("email"), CONSTRAINT "PK_8207e7889b50ee3695c2b8154ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reviews" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "calificacion" integer NOT NULL DEFAULT '5', "comentario" text, "userId" uuid, "doctorId" uuid, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "profile_image" character varying NOT NULL DEFAULT 'https://res.cloudinary.com/dvgvcleky/image/upload/f_auto,q_auto/v1/RestO/ffgx6ywlaix0mb3jghux', "password" character varying(128), "role" "public"."users_role_enum" NOT NULL DEFAULT 'PATIENT', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "apointments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fechaHora" TIMESTAMP NOT NULL, "estado" "public"."apointments_estado_enum" NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "doctorId" uuid, "scheduleId" uuid, CONSTRAINT "REL_340c011149468fedde38041f25" UNIQUE ("scheduleId"), CONSTRAINT "PK_071b800e2ca23195cbe9d6e2497" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "monto" numeric(10,2) NOT NULL, "estado" character varying(50) NOT NULL DEFAULT 'pendiente', "metodoPago" character varying(100) NOT NULL, "turnoId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d4cd725874e6403f6a8f774cdad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "doctors_specialities" ("doctorId" uuid NOT NULL, "specialityId" uuid NOT NULL, CONSTRAINT "PK_8287b270195e0f2d4d498eb4c1e" PRIMARY KEY ("doctorId", "specialityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_30c079ac33bb8669929bca5b1e" ON "doctors_specialities" ("doctorId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c019eff4a8e4ebee241711cb20" ON "doctors_specialities" ("specialityId") `);
        await queryRunner.query(`ALTER TABLE "doctor_schedules" ADD CONSTRAINT "FK_238680c7cf4a83dc020a7c824c5" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" ADD CONSTRAINT "FK_995a1c917cd6393f8c2962e2015" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" ADD CONSTRAINT "FK_d11c5bcc68435afa26784c0cc2c" FOREIGN KEY ("pagoId") REFERENCES "user_payments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctor_weekly_availability" ADD CONSTRAINT "FK_6aff20dc95d6d2c53a706f6fcad" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_c954aa19f3f500fc180000577ac" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "apointments" ADD CONSTRAINT "FK_6201acc4704e1dcf9de27cae20e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "apointments" ADD CONSTRAINT "FK_bc559aa20eff48268f32bb900ab" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "apointments" ADD CONSTRAINT "FK_340c011149468fedde38041f25b" FOREIGN KEY ("scheduleId") REFERENCES "doctor_schedules"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_payments" ADD CONSTRAINT "FK_fe3511a35b04e2e7cc02faf1d30" FOREIGN KEY ("turnoId") REFERENCES "apointments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctors_specialities" ADD CONSTRAINT "FK_30c079ac33bb8669929bca5b1e7" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "doctors_specialities" ADD CONSTRAINT "FK_c019eff4a8e4ebee241711cb20c" FOREIGN KEY ("specialityId") REFERENCES "doctor_specialities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctors_specialities" DROP CONSTRAINT "FK_c019eff4a8e4ebee241711cb20c"`);
        await queryRunner.query(`ALTER TABLE "doctors_specialities" DROP CONSTRAINT "FK_30c079ac33bb8669929bca5b1e7"`);
        await queryRunner.query(`ALTER TABLE "user_payments" DROP CONSTRAINT "FK_fe3511a35b04e2e7cc02faf1d30"`);
        await queryRunner.query(`ALTER TABLE "apointments" DROP CONSTRAINT "FK_340c011149468fedde38041f25b"`);
        await queryRunner.query(`ALTER TABLE "apointments" DROP CONSTRAINT "FK_bc559aa20eff48268f32bb900ab"`);
        await queryRunner.query(`ALTER TABLE "apointments" DROP CONSTRAINT "FK_6201acc4704e1dcf9de27cae20e"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_c954aa19f3f500fc180000577ac"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f"`);
        await queryRunner.query(`ALTER TABLE "doctor_weekly_availability" DROP CONSTRAINT "FK_6aff20dc95d6d2c53a706f6fcad"`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" DROP CONSTRAINT "FK_d11c5bcc68435afa26784c0cc2c"`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" DROP CONSTRAINT "FK_995a1c917cd6393f8c2962e2015"`);
        await queryRunner.query(`ALTER TABLE "doctor_schedules" DROP CONSTRAINT "FK_238680c7cf4a83dc020a7c824c5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c019eff4a8e4ebee241711cb20"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_30c079ac33bb8669929bca5b1e"`);
        await queryRunner.query(`DROP TABLE "doctors_specialities"`);
        await queryRunner.query(`DROP TABLE "user_payments"`);
        await queryRunner.query(`DROP TABLE "apointments"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
        await queryRunner.query(`DROP TABLE "doctors"`);
        await queryRunner.query(`DROP TABLE "doctor_weekly_availability"`);
        await queryRunner.query(`DROP TABLE "doctor_specialities"`);
        await queryRunner.query(`DROP TABLE "doctor_payments"`);
        await queryRunner.query(`DROP TABLE "doctor_schedules"`);
    }

}
