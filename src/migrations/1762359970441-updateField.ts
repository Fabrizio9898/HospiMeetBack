import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateField1762359970441 implements MigrationInterface {
    name = 'UpdateField1762359970441'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctors" RENAME COLUMN "RejectedReason" TO "rejectedReason"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctors" RENAME COLUMN "rejectedReason" TO "RejectedReason"`);
    }

}
