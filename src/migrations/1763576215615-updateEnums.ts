import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEnums1763576215615 implements MigrationInterface {
    name = 'UpdateEnums1763576215615'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."support_tickets_category_enum" RENAME TO "support_tickets_category_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."support_tickets_category_enum" AS ENUM('Problema Turno', 'Problema Pago', 'Falla Técnica', 'Cuenta/Login', 'Reportar Usuario', 'Otro')`);
        await queryRunner.query(`ALTER TABLE "support_tickets" ALTER COLUMN "category" TYPE "public"."support_tickets_category_enum" USING "category"::"text"::"public"."support_tickets_category_enum"`);
        await queryRunner.query(`DROP TYPE "public"."support_tickets_category_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."support_tickets_priority_enum" RENAME TO "support_tickets_priority_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."support_tickets_priority_enum" AS ENUM('Urgente', 'Alta', 'Media', 'Baja')`);
        await queryRunner.query(`ALTER TABLE "support_tickets" ALTER COLUMN "priority" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "support_tickets" ALTER COLUMN "priority" TYPE "public"."support_tickets_priority_enum" USING "priority"::"text"::"public"."support_tickets_priority_enum"`);
        await queryRunner.query(`ALTER TABLE "support_tickets" ALTER COLUMN "priority" SET DEFAULT 'Media'`);
        await queryRunner.query(`DROP TYPE "public"."support_tickets_priority_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."support_tickets_priority_enum_old" AS ENUM('urgent', 'high', 'medium', 'low')`);
        await queryRunner.query(`ALTER TABLE "support_tickets" ALTER COLUMN "priority" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "support_tickets" ALTER COLUMN "priority" TYPE "public"."support_tickets_priority_enum_old" USING "priority"::"text"::"public"."support_tickets_priority_enum_old"`);
        await queryRunner.query(`ALTER TABLE "support_tickets" ALTER COLUMN "priority" SET DEFAULT 'medium'`);
        await queryRunner.query(`DROP TYPE "public"."support_tickets_priority_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."support_tickets_priority_enum_old" RENAME TO "support_tickets_priority_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."support_tickets_category_enum_old" AS ENUM('appointment_issue', 'payment_issue', 'technical_issue', 'account_issue', 'other')`);
        await queryRunner.query(`ALTER TABLE "support_tickets" ALTER COLUMN "category" TYPE "public"."support_tickets_category_enum_old" USING "category"::"text"::"public"."support_tickets_category_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."support_tickets_category_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."support_tickets_category_enum_old" RENAME TO "support_tickets_category_enum"`);
    }

}
