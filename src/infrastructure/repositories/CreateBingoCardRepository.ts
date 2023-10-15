import { injectable } from "tsyringe";

import { ICreateBingoCardRepository } from "../../application/interfaces/IRepositories/ICreateBingoCardRepository";
import { AwsDynamoUtil } from "../../application/utils/AwsDynamoUtil";

@injectable()
export class CreateBingoCardRepository implements ICreateBingoCardRepository {
   private cardTable: string;

   constructor() {
      const { BINGO_CARD_TABLE } = process.env;
      this.cardTable = BINGO_CARD_TABLE || '';
   }

   async createCard(payload: any): Promise<void> {
      await AwsDynamoUtil.createRecord({
         TableName: this.cardTable,
         Item: payload
      });
   }
}
