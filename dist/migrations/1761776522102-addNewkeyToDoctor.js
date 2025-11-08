"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNewkeyToDoctor1761776522102 = void 0;
class AddNewkeyToDoctor1761776522102 {
    name = 'AddNewkeyToDoctor1761776522102';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "doctors" ADD "RejectedReason" text`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "RejectedReason"`);
    }
}
exports.AddNewkeyToDoctor1761776522102 = AddNewkeyToDoctor1761776522102;
//# sourceMappingURL=1761776522102-addNewkeyToDoctor.js.map