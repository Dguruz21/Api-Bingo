import 'reflect-metadata';

import { DependencyContainer } from 'tsyringe';

import { CreateBingoGameRepository } from './repositories/CreateBingoGameRepository';
import { CreateBingoCardRepository } from './repositories/CreateBingoCardRepository';

export class DIInfrastructureRegister {
   public static Add(container: DependencyContainer) {
      // repositories
      container.register("ICreateBingoGameRepository", CreateBingoGameRepository);
      container.register("ICreateBingoCardRepository", CreateBingoCardRepository);
      container.register("ICallBingoNumbersRepository", CreateBingoCardRepository);
   }
}
