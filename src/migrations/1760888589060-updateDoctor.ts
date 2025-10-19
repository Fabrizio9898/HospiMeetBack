import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDoctor1760888589060 implements MigrationInterface {
    name = 'UpdateDoctor1760888589060'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."doctor_documents_type_enum" AS ENUM('DNI_FRONT', 'DNI_BACK', 'MEDICAL_LICENSE')`);
        await queryRunner.query(`CREATE TABLE "doctor_documents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."doctor_documents_type_enum" NOT NULL, "url" character varying(500) NOT NULL, "verified" boolean NOT NULL DEFAULT false, "uploadedAt" TIMESTAMP NOT NULL DEFAULT now(), "doctorId" uuid, CONSTRAINT "PK_555f3923c2c70c0f158b08ca461" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "nombre"`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "apellido"`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "telefono"`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD "fullname" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD "dni" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD CONSTRAINT "UQ_94c3b2a30ab77bee2dc81b3ed1c" UNIQUE ("dni")`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD "medicalLicenseNumber" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD CONSTRAINT "UQ_0e66f6a1de61965fd036c98b534" UNIQUE ("medicalLicenseNumber")`);
        await queryRunner.query(`CREATE TYPE "public"."doctors_status_enum" AS ENUM('PENDING', 'ACTIVE', 'INACTIVE', 'SUSPENDED', 'BANNED')`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD "status" "public"."doctors_status_enum" NOT NULL DEFAULT 'PENDING'`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD "phoneNumber" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" ALTER COLUMN "comisionPorcentaje" SET DEFAULT '0.1'`);
        await queryRunner.query(`ALTER TABLE "doctor_documents" ADD CONSTRAINT "FK_a92fa2c0f4b73fc5e9abd3f5e4e" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctor_documents" DROP CONSTRAINT "FK_a92fa2c0f4b73fc5e9abd3f5e4e"`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" ALTER COLUMN "comisionPorcentaje" SET DEFAULT 0.1`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."doctors_status_enum"`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP CONSTRAINT "UQ_0e66f6a1de61965fd036c98b534"`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "medicalLicenseNumber"`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP CONSTRAINT "UQ_94c3b2a30ab77bee2dc81b3ed1c"`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "dni"`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "fullname"`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD "telefono" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD "apellido" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD "nombre" character varying(100) NOT NULL`);
        await queryRunner.query(`DROP TABLE "doctor_documents"`);
        await queryRunner.query(`DROP TYPE "public"."doctor_documents_type_enum"`);
    }

}
