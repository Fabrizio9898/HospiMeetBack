import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDoctor1761084234944 implements MigrationInterface {
    name = 'UpdateDoctor1761084234944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctors" ADD "profile_image" character varying NOT NULL DEFAULT 'https://res.cloudinary.com/dvgvcleky/image/upload/f_auto,q_auto/v1/RestO/ffgx6ywlaix0mb3jghux'`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" ALTER COLUMN "comisionPorcentaje" SET DEFAULT '0.1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctor_payments" ALTER COLUMN "comisionPorcentaje" SET DEFAULT 0.1`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "profile_image"`);
    }

}
