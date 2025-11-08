"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDoctor1761084234944 = void 0;
class UpdateDoctor1761084234944 {
    name = 'UpdateDoctor1761084234944';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "doctors" ADD "profile_image" character varying NOT NULL DEFAULT 'https://res.cloudinary.com/dvgvcleky/image/upload/f_auto,q_auto/v1/RestO/ffgx6ywlaix0mb3jghux'`);
        await queryRunner.query(`ALTER TABLE "doctor_payments" ALTER COLUMN "comisionPorcentaje" SET DEFAULT '0.1'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "doctor_payments" ALTER COLUMN "comisionPorcentaje" SET DEFAULT 0.1`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "profile_image"`);
    }
}
exports.UpdateDoctor1761084234944 = UpdateDoctor1761084234944;
//# sourceMappingURL=1761084234944-updateDoctor.js.map