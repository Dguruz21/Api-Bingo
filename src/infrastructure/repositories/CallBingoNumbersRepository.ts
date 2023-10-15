import { injectable } from "tsyringe";
import { DynamoDB } from "aws-sdk";

import { ICallBingoNumbersRepository } from "../../application/interfaces/IRepositories/ICallBingoNumbersRepository";
import { AwsDynamoUtil } from "../../application/utils/AwsDynamoUtil";

@injectable()
export class CallBingoNumbersRepository implements ICallBingoNumbersRepository {
   private bingoTable: string;
   private cardTable: string;

   constructor() {
      const { BINGO_GAME_TABLE, BINGO_CARD_TABLE } = process.env;

      this.bingoTable = BINGO_GAME_TABLE || '';
      this.cardTable = BINGO_CARD_TABLE || '';
   }

   async checkIfGameExists(payload: any): Promise<boolean> {
      const exists = await AwsDynamoUtil.getRecord({
         TableName: this.bingoTable,
         Key: {
            GameId: payload.GameId,
         },
      });
      return !!exists;
   }

   async checkCurrentNumbers(payload: any): Promise<object> {
      const data = await AwsDynamoUtil.getRecord({
         TableName: this.bingoTable,
         Key: {
            GameId: payload.GameId,
         },
      });
      return data;
   }

   async createFirstNumber(payload: any): Promise<void> {
      const firstRandomNumber = Math.floor(Math.random() * 75) + 1;
      await AwsDynamoUtil.updateRecord(
         {
            TableName: this.bingoTable,
            Key: {
               GameId: payload.GameId,
            },
            UpdateExpression: 'set numbers = :numbers',
            ExpressionAttributeValues: {
               ':numbers': DynamoDB.Converter.input([Number(firstRandomNumber)]),
            },
            ReturnValues: 'UPDATED_NEW',
         }
      )
   }
}
