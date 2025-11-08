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
exports.UpdatePasswordDto = exports.UpdateUserDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_entity_1 = require("../entities/user.entity");
const matchPassword_validator_1 = require("../validator/matchPassword.validator");
class UpdateUserDto extends (0, mapped_types_1.PartialType)((0, mapped_types_1.PickType)(user_entity_1.User, ["email"])) {
}
exports.UpdateUserDto = UpdateUserDto;
class UpdatePasswordDto {
    actual_password;
    newPassword;
    confirm_password;
}
exports.UpdatePasswordDto = UpdatePasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Password!1'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(8, 80, { message: 'Password must be at least 8 characters long.' }),
    (0, class_validator_1.Matches)(/^(?=.*[A-Z])(?=.*\d).*$/, {
        message: 'Password must contain at least one uppercase letter and one number.'
    }),
    __metadata("design:type", String)
], UpdatePasswordDto.prototype, "actual_password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Password!1'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(8, 80, { message: 'Password must be at least 8 characters long.' }),
    (0, class_validator_1.Matches)(/^(?=.*[A-Z])(?=.*\d).*$/, {
        message: 'Password must contain at least one uppercase letter and one number.'
    }),
    __metadata("design:type", String)
], UpdatePasswordDto.prototype, "newPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Password!1'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Validate)(matchPassword_validator_1.MatchPassword, ['password']),
    __metadata("design:type", String)
], UpdatePasswordDto.prototype, "confirm_password", void 0);
//# sourceMappingURL=updateUser.dto.js.map