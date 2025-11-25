import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateStatus1764093590427 implements MigrationInterface {
    name = 'UpdateStatus1764093590427'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_48844829b281251e1eb314acffb"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" RENAME COLUMN "doctorId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_fbdba4e2ac694cf8c9cecf4dc84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_fbdba4e2ac694cf8c9cecf4dc84"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" RENAME COLUMN "userId" TO "doctorId"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_48844829b281251e1eb314acffb" FOREIGN KEY ("doctorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
