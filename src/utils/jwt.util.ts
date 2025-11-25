// src/common/auth/jwt.util.ts
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';

const jwtService = new JwtService({ secret: process.env.JWT_SECRET });

export const generateToken = async (user: User): Promise<string> => {
  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
    planExpiresAt: user.planExpiresAt,
    bossId: user.boss ? user.boss.id : null
  };

  return jwtService.signAsync(payload);
};
