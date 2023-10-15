import { TracePayload } from "../../../../../shared/domain/payloads/TracePayload";
import { PaginationEntity } from "../../../../../shared/domain/entities/PaginationEntity";
import { RecordsExamPayload } from "../../domain/payloads/RecordsExamPayload";
import { MedicalExamType } from "../../domain/entities/MedicalExamType";

export interface IRecordsExamRepository {
    records: (payload: RecordsExamPayload, trace: TracePayload) => Promise<MedicalExamType[] | PaginationEntity<MedicalExamType>>;
}
