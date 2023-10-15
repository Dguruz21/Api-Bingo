import { injectable } from "tsyringe";

import { ICreateBingoGameRepository } from "../../application/interfaces/ICreateBingoGameRepository";
import { AwsDynamoUtil } from "../../application/utils/AwsDynamoUtil";

@injectable()
export class CreateBingoGameRepository implements ICreateBingoGameRepository {
   private table: string;

   constructor() {
      const { BINGO_GAME_TABLE } = process.env;

      this.table = BINGO_GAME_TABLE || 'no-se-encontro-tabla';
   }

   async create(payload: any): Promise<void> {
      await AwsDynamoUtil.createRecord({
         TableName: this.table,
         Item: payload
      });
   }
}
