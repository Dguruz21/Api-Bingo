import { inject, injectable } from 'tsyringe';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { ResponseUtil } from '../application/utils/ResponseUtil';
import { IBingoService } from '../application/interfaces/IServices/IBingoService';

@injectable()
export class BingoController {

   constructor(
      @inject('IBingoService') private readonly BingoService: IBingoService
   ) { }

   public async createGame(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
      const response = await this.BingoService.executeCreateGame();

      return ResponseUtil.response(response, 201);
   }

   public async createCard(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

      const payload = event.body ? JSON.parse(event.body) : event;

      const response = await this.BingoService.executeCreateCard(payload);

      return ResponseUtil.response(response);
   }

   public async callNumbers(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
      const { game_id = "" } = event.pathParameters || {};
      const response = await this.BingoService.executeCallNumbers(game_id);

      return ResponseUtil.response(response);
   }

   public async checkBingoWinner(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

      const payload = event.body ? JSON.parse(event.body) : event;

      const response = await this.BingoService.executeCheckBingoWinner(payload);

      return ResponseUtil.response(response);
   }

   public async emailNotification(event: any): Promise<APIGatewayProxyResult> {

      const record = event.Records;

      const payload = record ? JSON.parse(record[0].body) : event;

      const response = await this.BingoService.executeEmailNotification(payload);

      return ResponseUtil.response(response);
   }
}