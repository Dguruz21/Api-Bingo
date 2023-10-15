import { CidPayload } from "../../../../../shared/domain/payloads/CidPayload";
import { ToListEntity } from "../../../../../shared/domain/entities/ToListEntity";
import { RecordsExamPayload } from "../../domain/payloads/RecordsExamPayload";
import { RecordsExam } from "../../domain/results/RecordsExamResult";
import { PaginationResult } from "../../../../../shared/domain/results/PaginationResult";

export interface IRecordsExamService {
    records: (event: CidPayload<RecordsExamPayload>) => Promise<ToListEntity<RecordsExam> | PaginationResult<RecordsExam>>;
}
