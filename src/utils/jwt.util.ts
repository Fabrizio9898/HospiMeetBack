// src/common/auth/jwt.util.ts
import { JwtService } from '@nestjs/jwt';

const jwtService = new JwtService({ secret: process.env.JWT_SECRET });

export const generateToken = async (user: {
  id: string;
  email: string;
  role?: string;
}): Promise<string> => {
  const payload = { sub: user.id, email: user.email, role: user.role };
  return jwtService.signAsync(payload);
};
