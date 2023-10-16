import { APIGatewayProxyResult } from "aws-lambda";

import { ErrorModel } from "../../domain/models/ErrorModel";
import { NOT_CAPTURED_ERROR } from "../../domain/constants/ErrorConstant";
import { ServiceStatusEnum } from "../../domain/enumerations/ServiceStatusEnum";

export class ResponseUtil {
   static error(error: ErrorModel) {
      let { messages, httpCode } = error;

      httpCode = Number(error.httpCode) || NOT_CAPTURED_ERROR.httpCode;
      messages = error.messages || NOT_CAPTURED_ERROR.description;

      if (httpCode == ServiceStatusEnum.InternalError) {
         console.log('Error 500: ', JSON.stringify(error));
      }

      console.log(
         JSON.stringify({
            httpCode,
            messages,
         })
      );

      return ResponseUtil.response(
         {
            messages,
         },
         httpCode
      );
   }

   static response(
      payload: any,
      codeStatus: number = 200
   ): APIGatewayProxyResult | any {
      const obj = payload;

      return {
         statusCode: codeStatus,
         body: JSON.stringify(payload),
      };
   }
}
