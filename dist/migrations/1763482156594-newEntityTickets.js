"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewEntityTickets1763482156594 = void 0;
class NewEntityTickets1763482156594 {
    name = 'NewEntityTickets1763482156594';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."support_tickets_reporterrole_enum" AS ENUM('patient', 'admin', 'super_admin', 'doctor')`);
        await queryRunner.query(`CREATE TYPE "public"."support_tickets_category_enum" AS ENUM('appointment_issue', 'payment_issue', 'technical_issue', 'account_issue', 'other')`);
        await queryRunner.query(`CREATE TYPE "public"."support_tickets_priority_enum" AS ENUM('urgent', 'high', 'medium', 'low')`);
        await queryRunner.query(`CREATE TYPE "public"."support_tickets_status_enum" AS ENUM('open', 'in_progress', 'resolved', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "support_tickets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "reporterRole" "public"."support_tickets_reporterrole_enum" NOT NULL, "category" "public"."support_tickets_category_enum" NOT NULL, "priority" "public"."support_tickets_priority_enum" NOT NULL DEFAULT 'medium', "subject" character varying, "description" text NOT NULL, "attachment_url" character varying, "status" "public"."support_tickets_status_enum" NOT NULL DEFAULT 'open', "admin_response" text, "internal_notes" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "patientId" uuid, "doctorId" uuid, "appointmentId" uuid, CONSTRAINT "PK_942e8d8f5df86100471d2324643" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "support_tickets" ADD CONSTRAINT "FK_ee4836523357e2602737661bed5" FOREIGN KEY ("patientId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "support_tickets" ADD CONSTRAINT "FK_d39e5488a1cbfd3885d5defddec" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "support_tickets" ADD CONSTRAINT "FK_6fd4d17a20e67b2c43686fa2b3a" FOREIGN KEY ("appointmentId") REFERENCES "apointments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "support_tickets" DROP CONSTRAINT "FK_6fd4d17a20e67b2c43686fa2b3a"`);
        await queryRunner.query(`ALTER TABLE "support_tickets" DROP CONSTRAINT "FK_d39e5488a1cbfd3885d5defddec"`);
        await queryRunner.query(`ALTER TABLE "support_tickets" DROP CONSTRAINT "FK_ee4836523357e2602737661bed5"`);
        await queryRunner.query(`DROP TABLE "support_tickets"`);
        await queryRunner.query(`DROP TYPE "public"."support_tickets_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."support_tickets_priority_enum"`);
        await queryRunner.query(`DROP TYPE "public"."support_tickets_category_enum"`);
        await queryRunner.query(`DROP TYPE "public"."support_tickets_reporterrole_enum"`);
    }
}
exports.NewEntityTickets1763482156594 = NewEntityTickets1763482156594;
//# sourceMappingURL=1763482156594-newEntityTickets.js.map