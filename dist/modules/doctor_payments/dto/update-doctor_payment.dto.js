"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDoctorPaymentDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_doctor_payment_dto_1 = require("./create-doctor_payment.dto");
class UpdateDoctorPaymentDto extends (0, mapped_types_1.PartialType)(create_doctor_payment_dto_1.CreateDoctorPaymentDto) {
}
exports.UpdateDoctorPaymentDto = UpdateDoctorPaymentDto;
//# sourceMappingURL=update-doctor_payment.dto.js.map