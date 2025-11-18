import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserKeyname1763492572705 implements MigrationInterface {
    name = 'UpdateUserKeyname1763492572705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "name" TO "fullname"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "fullname" TO "name"`);
    }

}
