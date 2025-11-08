"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDoctorStatus1761268890931 = void 0;
class UpdateDoctorStatus1761268890931 {
    name = 'UpdateDoctorStatus1761268890931';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "doctor_payments" ALTER COLUMN "comisionPorcentaje" SET DEFAULT '0.1'`);
        await queryRunner.query(`ALTER TYPE "public"."doctor_documents_type_enum" RENAME TO "doctor_documents_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."doctor_documents_type_enum" AS ENUM('dni_front', 'dni_back', 'medical_license')`);
        await queryRunner.query(`ALTER TABLE "doctor_documents" ALTER COLUMN "type" TYPE "public"."doctor_documents_type_enum" USING "type"::"text"::"public"."doctor_documents_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."doctor_documents_type_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."doctors_status_enum" RENAME TO "doctors_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."doctors_status_enum" AS ENUM('pending', 'inactive', 'active', 'suspended', 'banned', 'rejected')`);
        await queryRunner.query(`ALTER TABLE "doctors" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "doctors" ALTER COLUMN "status" TYPE "public"."doctors_status_enum" USING "status"::"text"::"public"."doctors_status_enum"`);
        await queryRunner.query(`ALTER TABLE "doctors" ALTER COLUMN "status" SET DEFAULT 'inactive'`);
        await queryRunner.query(`DROP TYPE "public"."doctors_status_enum_old"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."doctors_status_enum_old" AS ENUM('PENDING', 'ACTIVE', 'SUSPENDED', 'BANNED', 'REJECTED')`);
        await queryRunner.query(`ALTER TABLE "doctors" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "doctors" ALTER COLUMN "status" TYPE "public"."doctors_status_enum_old" USING "status"::"text"::"public"."doctors_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "doctors" ALTER COLUMN "status" SET DEFAULT 'PENDING'`);
        await queryRunner.query(`DROP TYPE "public"."doctors_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."doctors_status_enum_old" RENAME TO "doctors_status_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."doctor_documents_type_enum_old" AS ENUM('DNI_FRONT', 'DNI_BACK', 'MEDICAL_LICENSE')`);
        await queryRunner.query(`ALTER TABLE "doctor_documents" ALTER COLUMN "type" TYPE "public"."doctor_documents_type_enum_old" USING "type"::"text"::"public"."doctor_documents_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."doctor_documents_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."doctor_documents_type_enum_old" RENAME TO "doctor_documents_type_enum"`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" ALTER COLUMN "comisionPorcentaje" SET DEFAULT 0.1`);
    }
}
exports.UpdateDoctorStatus1761268890931 = UpdateDoctorStatus1761268890931;
//# sourceMappingURL=1761268890931-updateDoctorStatus.js.map