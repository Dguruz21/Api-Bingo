import { inject, injectable } from "tsyringe";

import { ICreateBingoGameService } from "../interfaces/ICreateBingoGameService";
import { ICreateBingoGameRepository } from "../interfaces/ICreateBingoGameRepository";
import { GameError } from "../common/GameError";
import { CreateBingoGameResult } from "../../domain/results/CreateBingoGameResult";
import { ServiceStatusEnum } from "../../domain/enumerations/ServiceStatusEnum";

const { v4: uuidv4 } = require('uuid');

@injectable()
export class CreateBingoGameService implements ICreateBingoGameService {
   constructor(
      @inject("ICreateBingoGameRepository")
      private readonly CreateBingoGameRepository: ICreateBingoGameRepository,
   ) { }

   async execute(): Promise<CreateBingoGameResult> {
      const gameId = uuidv4();

      const params = {
         GameId: gameId,
      };

      try {
         await this.CreateBingoGameRepository.create(params);

         return { game_id: gameId };
      } catch (error: any) {
         throw new GameError({
            httpCode: ServiceStatusEnum.InternalError,
            messages: `Error al crear el juego de Bingo ${error.message}`,
         });
      }
   }
}
