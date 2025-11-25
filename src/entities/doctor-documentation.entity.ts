import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn
} from 'typeorm';
import { User } from './user.entity';
import { DoctorDocumentType } from 'src/enums/doctorDocument.enum';

@Entity('doctor_documents')
export class DoctorDocument {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: DoctorDocumentType })
  type: DoctorDocumentType;

  @Column({ type: 'varchar', length: 500 })
  url: string; // URL del archivo subido (ej. S3)

  @Column({ type: 'boolean', default: false })
  verified: boolean;

  @ManyToOne(() => User, (doctor) => doctor.documents)
  doctor: User;

  @CreateDateColumn()
  uploadedAt: Date;
}
