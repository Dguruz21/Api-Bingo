import 'reflect-metadata';

import { DependencyContainer } from 'tsyringe';

import { CreateBingoGameService } from './services/CreateBingoGameService';

export class DIApplicationRegister {
   public static Add(container: DependencyContainer) {
      // services
      container.register("ICreateBingoGameService", CreateBingoGameService);
   }
}
