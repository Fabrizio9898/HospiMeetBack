import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMoneyTransferEntities1763506778819 implements MigrationInterface {
    name = 'UpdateMoneyTransferEntities1763506778819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctor_payments" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" ADD "periodStart" date`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" ADD "periodEnd" date`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" ADD "paidAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD "lastPaymentDate" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "apointments" ADD "platformFee" numeric(10,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "apointments" ADD "doctorNetIncome" numeric(10,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "apointments" ADD "doctorPaymentId" uuid`);
        await queryRunner.query(`ALTER TABLE "apointments" ADD CONSTRAINT "FK_6bc8a5c99b29378fe3aaa4e1337" FOREIGN KEY ("doctorPaymentId") REFERENCES "doctor_payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "apointments" DROP CONSTRAINT "FK_6bc8a5c99b29378fe3aaa4e1337"`);
        await queryRunner.query(`ALTER TABLE "apointments" DROP COLUMN "doctorPaymentId"`);
        await queryRunner.query(`ALTER TABLE "apointments" DROP COLUMN "doctorNetIncome"`);
        await queryRunner.query(`ALTER TABLE "apointments" DROP COLUMN "platformFee"`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "lastPaymentDate"`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" DROP COLUMN "paidAt"`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" DROP COLUMN "periodEnd"`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" DROP COLUMN "periodStart"`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
