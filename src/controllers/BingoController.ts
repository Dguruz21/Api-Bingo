import { inject, injectable } from 'tsyringe';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { ResponseUtil } from '../application/utils/ResponseUtil';
import { ICreateBingoGameService } from '../application/interfaces/IServices/ICreateBingoGameService';
import { ICreateBingoCardService } from '../application/interfaces/IServices/ICreateBingoCardService';
import { ICallBingoNumbersService } from '../application/interfaces/IServices/ICallBingoNumbersService';


@injectable()
export class BingoController {

   constructor(
      @inject('ICreateBingoGameService') private readonly createBingoGameService: ICreateBingoGameService,
      @inject('ICreateBingoCardService') private readonly createBingoCardService: ICreateBingoCardService,
      @inject('ICallBingoNumbersService') private readonly callBingoNumbersService: ICallBingoNumbersService,
   ) { }

   public async createGame(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
      const response = await this.createBingoGameService.executeCreateGame();

      return ResponseUtil.response(response, 201);
   }

   public async createCard(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
      const response = await this.createBingoCardService.executeCreateCard();

      return ResponseUtil.response(response, 200);
   }

   public async callNumbers(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
      const response = await this.callBingoNumbersService.executeCallNumbers();

      return ResponseUtil.response(response, 200);
   }
}