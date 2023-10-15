
import "reflect-metadata";

import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from "aws-lambda";

import { diContainer } from '../DIRegister';
import { RecordsExamController } from '../moduls/exams/records/controllers/RecordsExamController';
import { errorHandlerMiddleware } from "../middlewares/ErrorMiddleWare";
import { IDatabaseConfig } from "../shared/application/interfaces/IDatabaseConfig";

async function handler (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
  const databaseConfig: IDatabaseConfig = diContainer.resolve("IDatabaseConfig");

  await databaseConfig.createConnection();

  const recordsExamController: RecordsExamController = diContainer.resolve("RecordsExamController")

  return await recordsExamController.execute(event)
}

const wrappedFunction = errorHandlerMiddleware(handler);

export {wrappedFunction as handler}
