import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSpeciality1761265086290 implements MigrationInterface {
    name = 'UpdateSpeciality1761265086290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctor_specialities" DROP CONSTRAINT "UQ_657657b9eb6d9bc7812212f5828"`);
        await queryRunner.query(`ALTER TABLE "doctor_specialities" DROP COLUMN "nombre"`);
        await queryRunner.query(`ALTER TABLE "doctor_specialities" DROP COLUMN "descripcion"`);
        await queryRunner.query(`ALTER TABLE "doctor_specialities" ADD "name" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor_specialities" ADD CONSTRAINT "UQ_0fa8336b03c45de4719c59f64b7" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "doctor_specialities" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" ALTER COLUMN "comisionPorcentaje" SET DEFAULT '0.1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctor_payments" ALTER COLUMN "comisionPorcentaje" SET DEFAULT 0.1`);
        await queryRunner.query(`ALTER TABLE "doctor_specialities" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "doctor_specialities" DROP CONSTRAINT "UQ_0fa8336b03c45de4719c59f64b7"`);
        await queryRunner.query(`ALTER TABLE "doctor_specialities" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "doctor_specialities" ADD "descripcion" text`);
        await queryRunner.query(`ALTER TABLE "doctor_specialities" ADD "nombre" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor_specialities" ADD CONSTRAINT "UQ_657657b9eb6d9bc7812212f5828" UNIQUE ("nombre")`);
    }

}
