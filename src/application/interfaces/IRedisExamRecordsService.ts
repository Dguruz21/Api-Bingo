import { TracePayload } from "../../../../../shared/domain/payloads/TracePayload";
import { MedicalExamType } from "../../domain/entities/MedicalExamType";

export interface IRedisExamRecordsService {
    records: (trace: TracePayload) => Promise<string>;
}
