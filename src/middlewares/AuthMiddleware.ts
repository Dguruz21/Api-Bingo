import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

export function authMiddleware(
  handler: (event: APIGatewayProxyEvent, context: Context) => Promise<APIGatewayProxyResult>
): (event: APIGatewayProxyEvent, context: Context) => Promise<APIGatewayProxyResult> {
  return async (event, context) => {
    // const user = await authenticateUser(event);

    // if (!user || !user.isEnabled) {
    //   return {
    //     statusCode: 401,
    //     body: JSON.stringify({ message: 'Usuario no autorizado' }),
    //   };
    // }

    return await handler(event, context);
  };
}
