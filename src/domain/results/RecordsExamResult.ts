import { ToListEntity } from "../../../../../shared/domain/entities/ToListEntity";
import { Mapper } from "../../../../../shared/application/common/Mapper";
import { PaginationEntity } from "../../../../../shared/domain/entities/PaginationEntity";
import { ResultUtil } from "../../../../../shared/application/utils/ResultUtil";
import { MedicalExamType } from "../entities/MedicalExamType";
import { PaginationResult } from "../../../../../shared/domain/results/PaginationResult";

export interface RecordsExam {
  id?: number;
  his_code?: string;
  segus_code?: string;
  description?: string;
  type?: number;
}

export class RecordsExamResult extends Mapper<MedicalExamType, RecordsExam> {
  protected map(entity: MedicalExamType): RecordsExam {
    return {
      id: entity.id,
      description: entity.description,
      his_code: entity.hisCode,
      segus_code: entity.segusCode,
      type: entity.type,
    };
  }

  public static of(
    payload: MedicalExamType[] | PaginationEntity<MedicalExamType> | ToListEntity<MedicalExamType>
  ): ToListEntity<RecordsExam> | PaginationResult<RecordsExam> {
    return ResultUtil.listOrPaginate(new RecordsExamResult(), payload);
  }
}
