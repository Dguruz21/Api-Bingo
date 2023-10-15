import { inject, injectable } from "tsyringe";

import { IRecordsExamService } from "../interfaces/IRecordsExamService";
import { IRecordsExamRepository } from "../interfaces/IRecordsExamRepository";
import { RecordsExam, RecordsExamResult } from "../../domain/results/RecordsExamResult";
import { RecordsExamPayload } from "../../domain/payloads/RecordsExamPayload";
import { IRedisExamRecordsService } from "../interfaces/IRedisExamRecordsService";
import { IRedisExamCreationService } from "../interfaces/IRedisExamCreationService";
import { CidPayload } from "../../../../../shared/domain/payloads/CidPayload";
import { TracePayload } from "../../../../../shared/domain/payloads/TracePayload";

@injectable()
export class RecordsExamService implements IRecordsExamService {
  constructor(
    @inject("IRecordsExamRepository")
    private readonly recordsExamRepository: IRecordsExamRepository,
    @inject("IRedisExamRecordsService")
    private readonly redisExamRecordsService: IRedisExamRecordsService,
    @inject("IRedisExamCreationService")
    private readonly redisExamCreationService: IRedisExamCreationService
  ) {}

  private async paginate(payload: RecordsExamPayload, trace: TracePayload) {
    return await this.recordsExamRepository.records(payload, trace);
  }

  private async recover(payload: RecordsExamPayload, trace: TracePayload) {
    const newPayload = { ...payload };

    // si no se pagina me interesa traer todo lo que se tiene en la db para luego subirlo a redis
    newPayload.search = '';
    delete newPayload.type;

    let entities;

    entities = await this.redisExamRecordsService.records(trace);

    if (entities) {
      return JSON.parse(entities);
    }

    entities = await this.recordsExamRepository.records(newPayload, trace);

    await this.redisExamCreationService.register(
      trace,
      JSON.stringify(entities)
    );

    return entities;
  }

  private filter(entities: RecordsExam[], payload: RecordsExamPayload): RecordsExam[] {
    const {
      search = "",
      type
    } = payload;

    return entities.filter((x) =>{
      const isDescription = `${x.description} ${x.his_code} ${x.segus_code}`?.toUpperCase().includes(search.toUpperCase());

      return type ? x?.type == type && isDescription : isDescription;
    });
  }

  public async records(event: CidPayload<RecordsExamPayload>) {
    let entities;

    const { payload, trace } = event.request;

    entities = payload.page
      ? await this.paginate(payload, trace)
      : await this.recover(payload, trace);

    if (!payload.page) {
      entities = this.filter(entities, payload);
    }

    return RecordsExamResult.of(entities);
  }
}
