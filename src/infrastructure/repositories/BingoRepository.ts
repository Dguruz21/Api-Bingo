import { injectable } from "tsyringe";
import { DynamoDB } from "aws-sdk";

import { IBingoRepository } from "../../application/interfaces/IRepositories/IBingoRepository";
import { AwsDynamoUtil } from "../../application/utils/AwsDynamoUtil";

@injectable()
export class BingoRepository implements IBingoRepository {
   private bingoTable: string;
   private cardTable: string;

   constructor() {

      const { BINGO_GAME_TABLE, BINGO_CARD_TABLE } = process.env;

      this.bingoTable = BINGO_GAME_TABLE || '';
      this.cardTable = BINGO_CARD_TABLE || '';
   }

   async createCard(payload: any): Promise<void> {
      await AwsDynamoUtil.createRecord({
         TableName: this.cardTable,
         Item: payload
      });
   }

   async createGame(payload: any): Promise<void> {
      await AwsDynamoUtil.createRecord({
         TableName: this.bingoTable,
         Item: payload
      });
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

   async checkIfCardExists(idCard: string): Promise<boolean> {
      const exists = await AwsDynamoUtil.getRecord({
         TableName: this.cardTable,
         Key: {
            CardId: idCard,
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

   async getPlayerBalls(idCard: string): Promise<object> {
      const data = await AwsDynamoUtil.getRecord({
         TableName: this.cardTable,
         Key: {
            CardId: idCard,
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
               ':numbers': new DynamoDB.DocumentClient().createSet([firstRandomNumber]),
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
