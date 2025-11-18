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
  role?: UserRole; // Filtrar: ¿Quiero ver reportes de doctores o pacientes?

  @IsOptional()
  @IsArray()
  @IsEnum(TicketCategory, { each: true }) // Valida que cada item del array sea una categoría válida
  @Type(() => String) // Transforma query param "cat1,cat2" si usas un custom pipe, o array directo
  categories?: TicketCategory[];
}
