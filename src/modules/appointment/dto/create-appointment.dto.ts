import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsUUID, Min, ValidateNested,  } from "class-validator";
import { AppointmentStatus } from "src/enums/appointment.enum";
import { CreatePatientDto } from "src/modules/patient/dto/createPatient.dto";

export class CreateAppointmentDto {
@ApiProperty({name:"fecha y hora"})
@IsNotEmpty()
@IsDateString()
dateHour:Date

@ApiProperty()
status:AppointmentStatus;

@ApiProperty()
@IsNumber({maxDecimalPlaces:2})
@Min(0)
cost:number

@IsOptional()
@IsUUID()
patientId?:string

@IsOptional()
@ValidateNested()
@Type(()=>CreatePatientDto)
newPatient?:CreatePatientDto

@IsOptional()
@IsUUID()
scheduleId?:string
}
