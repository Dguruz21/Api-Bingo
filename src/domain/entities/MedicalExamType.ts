import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { AuditableEntity } from "../../../../../shared/domain/entities/db/AuditableDbEntity";
import { MedicalExamTypeChannel } from "./MedicalExamTypeChannel";

@Entity({ name: "HEALTH_TIPO_EXAMEN_MEDICO" })
export class MedicalExamType extends AuditableEntity {
  @PrimaryGeneratedColumn({ name: "idTipoExamenMedico" })
  id: number;

  @Column({ name: "dscTipoExamenMedico" })
  description: string;

  @Column({ name: "indEliminado", length: 1 })
  deletedAt: string;

  @Column({ name: "codigoSegus" })
  segusCode: string;

  @Column({ name: "codigoHis" })
  hisCode: string;

  @Column({ name: "tipo" })
  type: number;

  @Column({ name: "stsTipoExamenMedio", length: 3 })
  state: string;

  @OneToMany(() => MedicalExamTypeChannel, (entity) => entity.medicalExamType)
  medicalExamTypeChannels: MedicalExamTypeChannel[];
}
