import * as fs from "fs";
import path from "path"

import { APIGatewayProxyEvent } from "aws-lambda";
import { mock } from "jest-mock-extended";

import { IBingoService } from "../../src/application/interfaces/IServices/IBingoService";
import { BingoController } from "../../src/controllers/BingoController";

describe("BingoController", () => {
   describe("getAllCards", () => {
      test("test getting all cards", async () => {
         const rawdata = fs.readFileSync(path.resolve(__dirname, "../mocks/requests/shared/APIGatewayProxyEvent.json"), "utf-8");
         const apiProxyEvent: APIGatewayProxyEvent = JSON.parse(rawdata);

         const bingoService = mock<IBingoService>();

         const bingoController = new BingoController(bingoService);

         const result = await bingoController.getAllCards(apiProxyEvent);

         expect(result.statusCode).toEqual(200);
      })
   })
});