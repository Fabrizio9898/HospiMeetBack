import { MigrationInterface, QueryRunner } from "typeorm";

export class Index1764099232030 implements MigrationInterface {
    name = 'Index1764099232030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_5a02cd85d2e23faebd57b1c2b3" ON "patients" ("email", "doctorId") WHERE "email" IS NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_1cd3e76dad6dea4c9ae40ae525" ON "patients" ("dni", "doctorId") WHERE "dni" IS NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_1cd3e76dad6dea4c9ae40ae525"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5a02cd85d2e23faebd57b1c2b3"`);
    }

}
