"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const apiStatus_enum_1 = require("../../../../enums/apiStatus.enum");
const cleanUser_dto_1 = require("../../dto/cleanUser.dto");
class UserLoginResponse {
    message;
    token;
    user;
}
exports.UserLoginResponse = UserLoginResponse;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: apiStatus_enum_1.ApiStatusEnum.LOGIN_SUCCESS,
        enum: apiStatus_enum_1.ApiStatusEnum
    }),
    __metadata("design:type", String)
], UserLoginResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    }),
    __metadata("design:type", String)
], UserLoginResponse.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => cleanUser_dto_1.UserClean }),
    __metadata("design:type", cleanUser_dto_1.UserClean)
], UserLoginResponse.prototype, "user", void 0);
//# sourceMappingURL=loginResponse.dto.js.map