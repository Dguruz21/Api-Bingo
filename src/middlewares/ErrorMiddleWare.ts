import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

import { ResponseUtil } from '../application/utils/ResponseUtil';

export function errorHandlerMiddleware(
   handler: (event: APIGatewayProxyEvent, context: Context) => Promise<APIGatewayProxyResult>
): (event: APIGatewayProxyEvent, context: Context) => Promise<APIGatewayProxyResult> {
   return async (event, context) => {
      try {
         return await handler(event, context);
      } catch (error: any) {
         return ResponseUtil.error(error);
      }
   };
}
