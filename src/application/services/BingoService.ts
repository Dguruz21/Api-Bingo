import { inject, injectable } from "tsyringe";

import { ServiceStatusEnum } from "../../domain/enumerations/ServiceStatusEnum";
import { IBingoService } from "../interfaces/IServices/IBingoService";
import { IBingoRepository } from "../interfaces/IRepositories/IBingoRepository";
import { CardError } from "../common/CardError";
import { CreateBingoGameResult } from "../../domain/results/CreateBingoGameResult";
import { CreateBingoCardResult } from "../../domain/results/CreateBingoCardResult";
import { GameError } from "../common/GameError";
import { AwsSESUtil } from "../utils/AwsSESUtil";
import { string } from "zod";
import { BingoCardTemplateUtil } from "../utils/BingoCardTemplateUtil";
import { PayloadSES } from "../../domain/models/PayloadSES";
import { AwsSQSUtil } from "../utils/AwsSQSUtil";
const { v4: uuidv4 } = require('uuid');

@injectable()
export class BingoService implements IBingoService {

   constructor(
      @inject("IBingoRepository")
      private readonly BingoRepository: IBingoRepository,
   ) { }

   async executeCallNumbers(gameId: string): Promise<object> {

      try {

         const exists = await this.BingoRepository.checkIfGameExists(gameId);

         if (!exists) {
            throw new CardError({
               httpCode: ServiceStatusEnum.NotFound,
               messages: 'No existe el juego',
            });
         }

         const bolillasdb: any = await this.BingoRepository.checkCurrentNumbers(gameId);

         if (bolillasdb.Item.numbers == undefined) {
            const firstRandomNumber = Math.floor(Math.random() * 75) + 1;

            await this.BingoRepository.createFirstNumber(gameId);

            return {
               bolilla: firstRandomNumber,
            }
         } else if (bolillasdb.Item.numbers.values.length >= 24) {


            const data: any = await this.BingoRepository.scanCards();

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

         const response = await this.BingoRepository.createNextNumbers({ gameId: gameId, currentBalls: bolillasdb.Item.numbers.values });

         return {
            bolillas: response,
         }

      } catch (error: any) {
         throw new CardError({
            httpCode: ServiceStatusEnum.InternalError,
            messages: `Error al llamar numero de Bingo ${error.message}`,
         });
      }
   }

   async executeCheckBingoWinner(payload: any): Promise<object> {

      const gameExists = await this.BingoRepository.checkIfGameExists(payload.game_id);

      if (!gameExists) {
         throw new CardError({
            httpCode: ServiceStatusEnum.NotFound,
            messages: 'No existe el juego',
         });
      }

      const cardExists = await this.BingoRepository.checkIfCardExists(payload.card_id);

      if (!cardExists) {
         throw new CardError({
            httpCode: ServiceStatusEnum.NotFound,
            messages: 'No existe el juego',
         });
      }

      const bolillasdb: any = await this.BingoRepository.checkCurrentNumbers(payload.game_id);

      if (bolillasdb.Item.numbers === undefined) {

         return {
            message: "No se ha llamado ninguna bolilla",
         }

      } else if (bolillasdb.Item.numbers.values.length < 24) {
         return {
            message: "No se han llamado suficientes bolillas, actual:",
         }
      } else if (bolillasdb.Item.numbers.values.length >= 24) {

         const playerballs: any = await this.BingoRepository.getPlayerBalls(payload.card_id);

         const allBallsFromPlayer = []

         for (let fila of playerballs.Item.Card) {
            for (let numero of fila) {
               allBallsFromPlayer.push(numero);
            }
         }

         let todosEncontrados = true;

         for (let i = 0; i < allBallsFromPlayer.length; i++) {
            if (!bolillasdb.Item.numbers.values.includes(allBallsFromPlayer[i])) {
               todosEncontrados = false;
               break;
            }
         }

         return {
            message: todosEncontrados ? "Hay ganador" : "No hay ganador",
         }
      }
      return {
         message: "TODO: Missing implementation"
      }

   }

   async executeCreateCard(payload: any): Promise<CreateBingoCardResult> {

      const cardId = new Date().getTime().toString();

      const generatedCard = this.generateRandomBingoCard();

      const params = {
         CardId: cardId,
         Card: generatedCard,
         Email: payload.email,
      };

      try {
         await this.BingoRepository.createCard(params);

         const card = generatedCard.map((column, index) => {
            if (index === 2) {
               column.splice(2, 0, 0); // TODO:Add free space
            }
            return column;
         });

         await this.consumerSqs({
            from: "dguruz2108@hotmail.com",
            to: payload.email,
            subject: "Este es tu carton de Bingo 🎉",
            textMessage: "Este es tu carton de Bingo 🎉",
            htmlMessage: BingoCardTemplateUtil.generateCardHTML(card)
         });

         return {
            card_id: cardId,
            card,
         };
      } catch (error: any) {
         throw new CardError({
            httpCode: ServiceStatusEnum.InternalError,
            messages: `Error al crear tarjeta de Bingo ${error.message}`,
         });
      }
   }

   async executeEmailNotification(payload: PayloadSES) {
      await AwsSESUtil.sendEmail(
         payload
      );
   }

   async executeCreateGame(): Promise<CreateBingoGameResult> {

      const gameId = uuidv4();

      try {

         await this.BingoRepository.createGame({
            GameId: gameId,
         });

         return { game_id: gameId };

      } catch (error: any) {
         throw new GameError({
            httpCode: ServiceStatusEnum.InternalError,
            messages: `Error al crear el juego de Bingo ${error.message}`,
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

   private async consumerSqs(payload: PayloadSES) {
      const params = {
         MessageBody: JSON.stringify(payload),
         QueueUrl: process.env.SQS_URL || 'no existe url'
      };

      try {
         await AwsSQSUtil.execute(params);
      } catch (error) {
         console.log(error);
      }
   }

}
