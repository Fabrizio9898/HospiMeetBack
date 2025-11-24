import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException // Usamos 403 Forbidden para "Sabemos quién sos, pero no podés pasar"
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ApiStatusEnum } from 'src/enums/apiStatus.enum'; // Tus enums
import { ApiError } from 'src/helpers/apiError.helper'; // Tu helper de errores

@Injectable()
export class SubscriptionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      throw new ApiError(ApiStatusEnum.NO_TOKEN_PROVIDED, ForbiddenException);
    }

    if (user.role === 'ADMIN') return true;

    if (!user.planExpiresAt) {
      throw new ApiError(
        ApiStatusEnum.SUBSCRIPTION_REQUIRED,
        ForbiddenException
      );
    }

    const expiryDate = new Date(user.planExpiresAt);
    const now = new Date();

    if (now > expiryDate) {
      throw new ApiError(
        ApiStatusEnum.SUBSCRIPTION_EXPIRED,
        ForbiddenException 
      );
    }

    return true;
  }
}
