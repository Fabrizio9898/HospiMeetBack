import { ApiProperty } from '@nestjs/swagger'; // Opcional si usas Swagger
import { TicketCategory } from 'src/enums/tickets/ticketCategory.enum';
import { TicketPriority } from 'src/enums/tickets/ticketPriority.enum';
import { TicketStatus } from 'src/enums/tickets/ticketStatus.enum';
import { UserRole } from 'src/enums/roles.enum';

export class TicketUserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @ApiProperty({ nullable: true })
  image?: string;
}

export class TicketDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  subject: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ enum: TicketCategory })
  category: TicketCategory;

  @ApiProperty({ enum: TicketPriority })
  priority: TicketPriority;

  @ApiProperty({ enum: TicketStatus })
  status: TicketStatus;

  @ApiProperty()
  date: string;

  @ApiProperty({ nullable: true })
  adminResponse?: string;

  @ApiProperty({ nullable: true })
  bookingId?: string;

  @ApiProperty({ type: TicketUserDto })
  user: TicketUserDto;
}

export class MetaDataDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  lastPage: number;

  @ApiProperty()
  limit: number;
}

// --- ESTE ES EL DTO PRINCIPAL DE RETORNO ---
export class TicketResponseDto {
  @ApiProperty({ type: [TicketDto] })
  data: TicketDto[];

  @ApiProperty({ type: MetaDataDto })
  meta: MetaDataDto;
}
