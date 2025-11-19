import {
  IsOptional,
  IsEnum,
  IsInt,
  Min,
  IsArray,
  IsString
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  TicketCategory,
} from '../../../enums/tickets/ticketCategory.enum';
import {TicketPriority} from '../../../enums/tickets/ticketPriority.enum';
import {TicketStatus} from '../../../enums/tickets/ticketStatus.enum';
import { UserRole } from 'src/enums/roles.enum';

export class GetTicketsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsEnum(TicketStatus)
  status?: TicketStatus;

  @IsOptional()
  @IsEnum(TicketPriority)
  priority?: TicketPriority;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsArray()
  @IsEnum(TicketCategory, { each: true })
  @Type(() => String)
  categories?: TicketCategory[];
}
