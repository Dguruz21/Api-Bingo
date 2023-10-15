import { APIGatewayProxyResult } from "aws-lambda";

import { ErrorEntity } from "../../domain/entities/ErrorEntity";
import { CosumerEnum } from "../../domain/enumerations/CosumerEnum";
import { NO_CAPTURADO_ERROR } from "../../domain/constants/ErrorConstant";
import { ServiceStatusEnum } from "../../domain/enumerations/ServiceStatusEnum";

export class ResponseUtil {
  static error(error: ErrorEntity, consumer = CosumerEnum.LAMBDA) {
    let { code, messages, httpCode } = error;

    // if (ERRORES_BUSINESS[code]) {
    //   const nameError = ERRORES_BUSINESS[code].CNL;

    //   error.code = ErrorConstants[nameError].code;
    //   error.httpCode = ErrorConstants[nameError].httpCode;
    //   error.messages = ErrorConstants[nameError].description;
    // }

    httpCode = Number(error.httpCode) || NO_CAPTURADO_ERROR.httpCode;
    code = error.code || NO_CAPTURADO_ERROR.code;
    messages = error.messages || NO_CAPTURADO_ERROR.description;

    if (httpCode == ServiceStatusEnum.InternalError) {
      console.log('Error 500: ', JSON.stringify(error));
    }

    console.log(
      JSON.stringify({
        httpCode,
        code,
        messages,
      })
    );

    return ResponseUtil.response(
      {
        code,
        messages,
      },
      consumer,
      httpCode
    );
  }

  static response(
    cuerpo: any,
    consumer: CosumerEnum = CosumerEnum.LAMBDA,
    codeStatus: number = 200
  ): APIGatewayProxyResult | any {
    const obj = cuerpo;

    if (CosumerEnum.LAMBDA === consumer) {
      return obj;
    }

    return {
      statusCode: codeStatus,
      body: JSON.stringify(cuerpo),
      headers: {
        "Access-Control-Allow-Origin": process.env.ORIGIN || "*",
        "Access-Control-Allow-Credentials": true,
        "X-Content-Type-Options": "nosniff",
        "X-XSS-Protection": "1; mode=block",
        "X-Frame-Options": "SAMEORIGIN",
        "Referrer-Policy": "no-referrer-when-downgrade",
        "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
      },
    };
  }
}
