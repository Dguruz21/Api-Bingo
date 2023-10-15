import { injectable } from "tsyringe";

import {
  REDIS_OPERATIONS,
} from "../../domain/constants/DomainConstant";
import { TRACE } from "../../../../../shared/domain/constants/DomainConstant";
import { CidPayload } from "../../../../../shared/domain/payloads/CidPayload";
import { TracePayload } from "../../../../../shared/domain/payloads/TracePayload";
import { AwsLambdaUtil } from "../../../../../shared/application/utils/AwsLambdaUtil";
import { LambdaDoesNotExist } from "../../../../../shared/domain/constants/errors/LambdaDoesNotExist";
import { IRedisExamRecordsService } from "../../application/interfaces/IRedisExamRecordsService";
import { MedicalExamType } from "../../domain/entities/MedicalExamType";

@injectable()
export class RedisExamRecordsService implements IRedisExamRecordsService {
  private lambda?: string;
  private key: string;

  constructor() {
    const { LMB_OBTENER_REDIS } = process.env;

    this.lambda = LMB_OBTENER_REDIS;
    this.key = "examenes";
  }

  /**
   * @param {TracePayload} trace rastro de la petición
   * @returns
   */
  async records(trace: TracePayload): Promise<string> {
    trace = {
      ...trace,
      moduleId: TRACE.MODULE_ID,
      serviceId: TRACE.SERVICE_ID,
      consumerId: TRACE.CONSUMER_ID,
    };

    if (!this.lambda) {
      LambdaDoesNotExist.launch();
    }

    const stage = process.env.STAGE!;
    const key = `${this.key}_${trace.channelId!}_${stage}`;

    const payload = {
      key,
      operacion: REDIS_OPERATIONS.GET,
    };

    const request: CidPayload<any> = {
      request: {
        trace,
        payload,
      },
    };

    const result = await AwsLambdaUtil.invokeFunction<CidPayload<any>>(
      this.lambda!,
      request
    );

    return result?.response?.payload;
  }
}
