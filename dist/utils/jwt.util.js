"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jwt_1 = require("@nestjs/jwt");
const jwtService = new jwt_1.JwtService({ secret: process.env.JWT_SECRET });
const generateToken = async (user) => {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return jwtService.signAsync(payload);
};
exports.generateToken = generateToken;
//# sourceMappingURL=jwt.util.js.map