import { injectable } from "tsyringe";

import { ICreateBingoGameRepository } from "../../application/interfaces/IRepositories/ICreateBingoGameRepository";
import { AwsDynamoUtil } from "../../application/utils/AwsDynamoUtil";

@injectable()
export class CreateBingoGameRepository implements ICreateBingoGameRepository {
   private bingoTable: string;

   constructor() {
      const { BINGO_GAME_TABLE } = process.env;
      this.bingoTable = BINGO_GAME_TABLE || '';
   }

   async createGame(payload: any): Promise<void> {
      await AwsDynamoUtil.createRecord({
         TableName: this.bingoTable,
         Item: payload
      });
   }
}
