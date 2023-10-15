import AWS from "aws-sdk";

import { BusinessError } from "../common/BusinessError";
import { LambdaError } from "../../domain/constants/errors/LambdaError";

export class AwsLambdaUtil {
  /**
   * Consumir lambda
   * @param {string} functionName nombre de lambda
   * @param {T} request cuerpo de la peticion
   */
  static async invokeFunction<T>(functionName: string, request: T) {
    let result: any;

    const lambda = new AWS.Lambda();

    try {
      result = await lambda
        .invoke({
          InvocationType: "RequestResponse",
          FunctionName: functionName,
          Payload: JSON.stringify(request),
        })
        .promise();
    } catch (error: any) {
      LambdaError.launch(JSON.stringify(error.message));
    }

    const responsePayload = JSON.parse(result.Payload);

    if (
      result.StatusCode != 200 ||
      !responsePayload?.response?.status?.success
    ) {
      const {
        // antiguo formato de error
        response: {
          status: { error },
        },
        // nuevo formato de error
        code,
        messages,
      } = responsePayload;

      if (error) {
        // esto es por parte del antiguo formato de error
        throw new BusinessError({
          code: error.code,
          httpCode: error.httpCode,
          messages: error.messages,
        });
      }

      // esto es por parte del nuevo formato de error
      throw new BusinessError({
        code,
        httpCode: result.StatusCode,
        messages,
      });
    }

    return responsePayload;
  }
}
