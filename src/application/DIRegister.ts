import 'reflect-metadata';

import { DependencyContainer } from 'tsyringe';

import { CreateBingoGameService } from './services/CreateBingoGameService';
import { CreateBingoCardService } from './services/CreateBingoCardService';

export class DIApplicationRegister {
   public static Add(container: DependencyContainer) {
      // services
      container.register("ICreateBingoGameService", CreateBingoGameService);
      container.register("ICreateBingoCardService", CreateBingoCardService);
      container.register("ICallBingoNumbersService", CreateBingoCardService);
   }
}
