
import "reflect-metadata";

import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from "aws-lambda";

import { diContainer } from '../DIRegister';
import { BingoController } from '../controllers/BingoController';
import { errorHandlerMiddleware } from "../middlewares/ErrorMiddleWare";

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
   const BingoController: BingoController = diContainer.resolve("BingoController")

   return await BingoController.createCard(event)
}

const wrappedFunction = errorHandlerMiddleware(handler);

export { wrappedFunction as handler }
