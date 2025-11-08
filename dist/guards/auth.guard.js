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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const roles_decorator_1 = require("../decorators/roles.decorator");
const apiStatus_enum_1 = require("../enums/apiStatus.enum");
const apiError_helper_1 = require("../helpers/apiError.helper");
let AuthGuard = class AuthGuard {
    jwtService;
    reflector;
    constructor(jwtService, reflector) {
        this.jwtService = jwtService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token)
            throw new apiError_helper_1.ApiError(apiStatus_enum_1.ApiStatusEnum.NO_TOKEN_PROVIDED, common_1.UnauthorizedException);
        let payload;
        try {
            payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET
            });
            request.user = payload;
        }
        catch (error) {
            throw new apiError_helper_1.ApiError(apiStatus_enum_1.ApiStatusEnum.INVALID_TOKEN, common_1.UnauthorizedException);
        }
        const requiredRoles = this.reflector.get(roles_decorator_1.ROLES_KEY, context.getHandler());
        if (requiredRoles && requiredRoles.length > 0) {
            const hasRole = () => requiredRoles.some((role) => role === payload.role);
            if (!hasRole()) {
                throw new apiError_helper_1.ApiError(apiStatus_enum_1.ApiStatusEnum.INSUFFICIENT_PERMISSIONS, common_1.UnauthorizedException);
            }
        }
        return true;
    }
    extractTokenFromHeader(request) {
        const authHeader = request.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
            return authHeader.split(' ')[1];
        }
        return undefined;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        core_1.Reflector])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map