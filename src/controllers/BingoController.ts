import { inject, injectable } from 'tsyringe';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { ICreateBingoGameService } from '../application/interfaces/ICreateBingoGameService';
import { ResponseUtil } from '../application/utils/ResponseUtil';

@injectable()
export class BingoController {

   constructor(
      @inject('ICreateBingoGameService') private readonly createBingoGameService: ICreateBingoGameService) {
   }

   public async createGame(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
      const response = await this.createBingoGameService.execute();

      return ResponseUtil.response(response, 201);
   }
}