"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserClean = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../../../entities/user.entity");
;
class UserClean extends (0, swagger_1.OmitType)(user_entity_1.User, [
    'password',
    "appointments",
    "reviews",
    "createdAt",
    "updatedAt",
]) {
}
exports.UserClean = UserClean;
//# sourceMappingURL=cleanUser.dto.js.map