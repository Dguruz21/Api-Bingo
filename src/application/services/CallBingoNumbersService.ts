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
         const exists = await this.CallBingoNumbersRepository.checkIfGameExists("7f073eeb-a403-452c-91af-a68c9ea1819c");

         return { existe: exists };

      } catch (error: any) {
         throw new CardError({
            httpCode: ServiceStatusEnum.InternalError,
            messages: `Error al llamar tarjeta de Bingo ${error.message}`,
         });
      }
   }
}
