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

   async checkIfGameExists(idGame: string): Promise<boolean> {
      const exists = await AwsDynamoUtil.getRecord({
         TableName: this.bingoTable,
         Key: {
            GameId: idGame,
         },
      });
      return !!exists;
   }

   async scanCards(): Promise<object> {
      const data = await AwsDynamoUtil.scanRecords(this.cardTable);
      return data;
   }

   async checkCurrentNumbers(idGame: string): Promise<object> {
      const data = await AwsDynamoUtil.getRecord({
         TableName: this.bingoTable,
         Key: {
            GameId: idGame,
         },
      });
      return data;
   }

   async createFirstNumber(idGame: string): Promise<void> {
      const firstRandomNumber = Math.floor(Math.random() * 75) + 1;
      await AwsDynamoUtil.updateRecord(
         {
            TableName: this.bingoTable,
            Key: {
               GameId: idGame,
            },
            UpdateExpression: 'set numbers = :numbers',
            ExpressionAttributeValues: {
               ':numbers': DynamoDB.Converter.input([Number(firstRandomNumber)]),
            },
            ReturnValues: 'UPDATED_NEW',
         }
      )
   }

   async createNextNumbers(payload: any): Promise<object> {

      let number;

      do {
         number = Math.floor(Math.random() * 75) + 1;
      } while (payload.currentBalls.includes(number));
      payload.currentBalls.push(number);

      await AwsDynamoUtil.updateRecord(
         {
            TableName: this.bingoTable,
            Key: {
               GameId: payload.gameId,
            },
            UpdateExpression: 'set numbers = :numbers',
            ExpressionAttributeValues: {
               ':numbers': new DynamoDB.DocumentClient().createSet(payload.currentBalls),
            },
            ReturnValues: 'UPDATED_NEW',
         }
      )

      return payload.currentBalls;
   }
}
