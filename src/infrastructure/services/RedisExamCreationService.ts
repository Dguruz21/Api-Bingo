import { injectable } from "tsyringe";

import {
  REDIS_OPERATIONS,
  REDIS_EXPIRATION_TIME,
} from "../../domain/constants/DomainConstant";
import { TRACE } from "../../../../../shared/domain/constants/DomainConstant";
import { CidPayload } from "../../../../../shared/domain/payloads/CidPayload";
import { TracePayload } from "../../../../../shared/domain/payloads/TracePayload";
import { AwsLambdaUtil } from "../../../../../shared/application/utils/AwsLambdaUtil";
import { LambdaDoesNotExist } from "../../../../../shared/domain/constants/errors/LambdaDoesNotExist";
import { IRedisExamCreationService } from "../../application/interfaces/IRedisExamCreationService";

@injectable()
export class RedisExamCreationService implements IRedisExamCreationService {
  private lambda?: string;
  private key: string;

  constructor() {
    const { LMB_OBTENER_REDIS } = process.env;

    this.lambda = LMB_OBTENER_REDIS;
    this.key = "examenes";
  }

  /**
   * @param {TracePayload} trace seguimiento de la petición
   * @param {string} value string de examenes en formato json
   * @param {number} expiration hora de expiración
   * @returns
   */
  async register(
    trace: TracePayload,
    value: string,
    expiration: number = REDIS_EXPIRATION_TIME
  ) {
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
      valor: value,
      expiracion: expiration,
      operacion: REDIS_OPERATIONS.REGISTER,
    };

    console.log(`Lambda registrar examenes redis >>> ${this.lambda}`);

    const request: CidPayload<any> = {
      request: {
        trace,
        payload,
      },
    };

    console.log(
      `Petición registrar examenes redis >>> ${JSON.stringify(request)}`
    );

    const result = await AwsLambdaUtil.invokeFunction<CidPayload<any>>(
      this.lambda!,
      request
    );

    console.log(
      `Respuesta registrar examenes redis >>> ${JSON.stringify(result)}`
    );
  }
}
