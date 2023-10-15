import { inject, injectable } from "tsyringe";

import { ServiceStatusEnum } from "../../domain/enumerations/ServiceStatusEnum";
import { CreateBingoCardResult } from "../../domain/results/CreateBingoCardResult";
import { ICreateBingoCardService } from "../interfaces/IServices/ICreateBingoCardService";
import { ICreateBingoCardRepository } from "../interfaces/IRepositories/ICreateBingoCardRepository";
import { CardError } from "../common/CardError";

@injectable()
export class CreateBingoCardService implements ICreateBingoCardService {

   constructor(
      @inject("ICreateBingoCardRepository")
      private readonly CreateBingoCardRepository: ICreateBingoCardRepository,
   ) { }

   async executeCreateCard(): Promise<CreateBingoCardResult> {

      const cardId = new Date().getTime().toString();

      const card = this.generateRandomBingoCard();

      const params = {
         CardId: cardId,
         Card: card,
      };

      try {
         await this.CreateBingoCardRepository.createCard(params);

         return {
            card_id: cardId,
            card: card.map((column, index) => {
               if (index === 2) {
                  column.splice(2, 0, 0); // TODO:Add free space
               }
               return column;
            }),
         };

      } catch (error: any) {
         throw new CardError({
            httpCode: ServiceStatusEnum.InternalError,
            messages: `Error al crear tarjeta de Bingo ${error.message}`,
         });
      }
   }


   //PRIVATE INTERNAL METHODS
   private generateRandomBingoCard() {
      const bingoCard: number[][] = [];

      for (let col = 0; col < 5; col++) {

         const column: number[] = [];

         let limitNumber = 5;

         if (col === 2) limitNumber--;

         while (column.length < limitNumber) {
            const randomNumber = this.getRandomNumberForColumn(col);
            if (!column.includes(randomNumber)) {
               column.push(randomNumber);
            }
         }

         bingoCard.push(column);
      }

      return bingoCard;
   }

   private getRandomNumberForColumn(col: number) {
      const min = col * 15 + 1;
      const max = (col + 1) * 15;
      return Math.floor(Math.random() * (max - min + 1)) + min;
   }
}
