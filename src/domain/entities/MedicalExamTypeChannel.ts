import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";

import { AuditableEntity } from "../../../../../shared/domain/entities/db/AuditableDbEntity";
import { MedicalExamType } from "./MedicalExamType";

@Entity({ name: "HEALTH_TIPO_EXAMEN_MEDICO_CHANNEL" })
export class MedicalExamTypeChannel extends AuditableEntity {
  @PrimaryColumn({ name: "idChannel" })
  channelId: number;

  @PrimaryColumn({ name: "idTipoExamenMedico" })
  medicalExamId: number;

  @Column({ name: "stsTipoExamenMedicoChannel", length: 3 })
  state: string;

  @ManyToOne(() => MedicalExamType, (entity) => entity.medicalExamTypeChannels)
  @JoinColumn({ name: 'idTipoExamenMedico' })
  medicalExamType: MedicalExamType;
}
