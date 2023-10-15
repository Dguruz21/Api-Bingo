import { TracePayload } from "../../../../../shared/domain/payloads/TracePayload";
import { PaginationEntity } from "../../../../../shared/domain/entities/PaginationEntity";
import { MedicalExamType } from "../../domain/entities/MedicalExamType";

export interface IRedisExamCreationService {
    register: (trace: TracePayload, value: string, expiration?: number) => void;
}
