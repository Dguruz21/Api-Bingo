import { inject, injectable } from "tsyringe";

import { ServiceStatusEnum } from "../../domain/enumerations/ServiceStatusEnum";
import { ICallBingoNumbersService } from "../interfaces/IServices/ICallBingoNumbersService";
import { ICallBingoNumbersRepository } from "../interfaces/IRepositories/ICallBingoNumbersRepository";
import { CardError } from "../common/CardError";


@injectable()
export class CallBingoNumbersService implements ICallBingoNumbersService {

   constructor(
      @inject("ICallBingoNumbersRepository")
      private readonly CallBingoNumbersRepository: ICallBingoNumbersRepository,
   ) { }

   async executeCallNumbers(): Promise<object> {

      try {

         const exists = await this.CallBingoNumbersRepository.checkIfGameExists("c9859580-3d11-461c-ba10-0b86cb1bc18f");

         if (!exists) {
            throw new CardError({
               httpCode: ServiceStatusEnum.NotFound,
               messages: 'No existe el juego',
            });
         }

         const bolillasdb: any = await this.CallBingoNumbersRepository.checkCurrentNumbers("c9859580-3d11-461c-ba10-0b86cb1bc18f");

         if (bolillasdb.Item.numbers == undefined) {
            const firstRandomNumber = Math.floor(Math.random() * 75) + 1;

            await this.CallBingoNumbersRepository.createFirstNumber("7f073eeb-a403-452c-91af-a68c9ea1819c");

            return {
               bolilla: firstRandomNumber,
            }
         } else if (bolillasdb.Item.numbers.values.length >= 24) {


            const data: any = await this.CallBingoNumbersRepository.scanCards();

            for (let card of data.Items) {

               const allBallsFromPlayer = []
               for (let fila of card.Card) {
                  for (let numero of fila) {
                     allBallsFromPlayer.push(numero);
                  }
               }
               let count = 0;
               for (let i = 0; i < allBallsFromPlayer.length; i++) {
                  if (bolillasdb.Item.numbers.values.includes(allBallsFromPlayer[i])) {
                     count++;
                     if (count === 24) {
                        return {
                           response: "Hay ganador",
                        }
                     }
                  }
               }
            }
         }

         console.log(bolillasdb.Item.numbers.values);

         const response = await this.CallBingoNumbersRepository.createNextNumbers({ gameId: "c9859580-3d11-461c-ba10-0b86cb1bc18f", currentBalls: bolillasdb.Item.numbers.values });

         return {
            bolillas: response,
         }


      } catch (error: any) {
         throw new CardError({
            httpCode: ServiceStatusEnum.InternalError,
            messages: `Error al llamar tarjeta de Bingo ${error.message}`,
         });
      }
   }
}
