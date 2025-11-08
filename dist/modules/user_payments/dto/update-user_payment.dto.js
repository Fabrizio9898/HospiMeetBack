"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserPaymentDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_user_payment_dto_1 = require("./create-user_payment.dto");
class UpdateUserPaymentDto extends (0, mapped_types_1.PartialType)(create_user_payment_dto_1.CreateUserPaymentDto) {
}
exports.UpdateUserPaymentDto = UpdateUserPaymentDto;
//# sourceMappingURL=update-user_payment.dto.js.map