"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUser1761083954731 = void 0;
class UpdateUser1761083954731 {
    name = 'UpdateUser1761083954731';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."doctors_role_enum" AS ENUM('patient', 'admin', 'super_admin', 'doctor')`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD "role" "public"."doctors_role_enum" NOT NULL DEFAULT 'doctor'`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" ALTER COLUMN "comisionPorcentaje" SET DEFAULT '0.1'`);
        await queryRunner.query(`ALTER TYPE "public"."doctors_status_enum" RENAME TO "doctors_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."doctors_status_enum" AS ENUM('PENDING', 'ACTIVE', 'SUSPENDED', 'BANNED', 'REJECTED')`);
        await queryRunner.query(`ALTER TABLE "doctors" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "doctors" ALTER COLUMN "status" TYPE "public"."doctors_status_enum" USING "status"::"text"::"public"."doctors_status_enum"`);
        await queryRunner.query(`ALTER TABLE "doctors" ALTER COLUMN "status" SET DEFAULT 'PENDING'`);
        await queryRunner.query(`DROP TYPE "public"."doctors_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL`);
        await queryRunner.query(`ALTER TYPE "public"."users_role_enum" RENAME TO "users_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('patient', 'admin', 'super_admin', 'doctor')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum" USING "role"::"text"::"public"."users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'patient'`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum_old"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum_old" AS ENUM('PATIENT', 'ADMIN')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum_old" USING "role"::"text"::"public"."users_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'PATIENT'`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."users_role_enum_old" RENAME TO "users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."doctors_status_enum_old" AS ENUM('PENDING', 'ACTIVE', 'INACTIVE', 'SUSPENDED', 'BANNED')`);
        await queryRunner.query(`ALTER TABLE "doctors" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "doctors" ALTER COLUMN "status" TYPE "public"."doctors_status_enum_old" USING "status"::"text"::"public"."doctors_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "doctors" ALTER COLUMN "status" SET DEFAULT 'PENDING'`);
        await queryRunner.query(`DROP TYPE "public"."doctors_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."doctors_status_enum_old" RENAME TO "doctors_status_enum"`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" ALTER COLUMN "comisionPorcentaje" SET DEFAULT 0.1`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."doctors_role_enum"`);
    }
}
exports.UpdateUser1761083954731 = UpdateUser1761083954731;
//# sourceMappingURL=1761083954731-updateUser.js.map