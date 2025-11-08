"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateField1762359970441 = void 0;
class UpdateField1762359970441 {
    name = 'UpdateField1762359970441';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "doctors" RENAME COLUMN "RejectedReason" TO "rejectedReason"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "doctors" RENAME COLUMN "rejectedReason" TO "RejectedReason"`);
    }
}
exports.UpdateField1762359970441 = UpdateField1762359970441;
//# sourceMappingURL=1762359970441-updateField.js.map