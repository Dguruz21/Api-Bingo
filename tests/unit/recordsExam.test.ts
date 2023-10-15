import * as fs from "fs";
import path from "path"

import { APIGatewayProxyEvent } from "aws-lambda";
import { mock } from "jest-mock-extended";

import { IRecordsExamService } from "../../src/moduls/exams/records/application/interfaces/IRecordsExamService";
import { RecordsExamController } from "../../src/moduls/exams/records/controllers/RecordsExamController";

describe("RecordsExamController", () => {
  describe("launch", () => {
    test("test get exams", async () => {
      const rawdata = fs.readFileSync(path.resolve(__dirname, "../mocks/requests/shared/APIGatewayProxyEvent.json"), "utf-8");
      const apiProxyEvent: APIGatewayProxyEvent = JSON.parse(rawdata);

      const payload = fs.readFileSync(path.resolve(__dirname, "../mocks/requests/mockRecordsExam.json"), "utf-8");

      apiProxyEvent.body = JSON.stringify(payload);

      const recordsExamService = mock<IRecordsExamService>();

    //   recordsExamService.records.mockResolvedValue(payload);

      const userController = new RecordsExamController(recordsExamService);

      const result = await userController.execute(apiProxyEvent);

      expect(result.statusCode).toEqual(200);
    })
  })
});