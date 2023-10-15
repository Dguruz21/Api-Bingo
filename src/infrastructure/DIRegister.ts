import 'reflect-metadata';

import { DependencyContainer } from 'tsyringe';

import { CreateBingoGameRepository } from './repositories/CreateBingoGameRepository';

export class DIInfrastructureRegister {
   public static Add(container: DependencyContainer) {
      // repositories
      container.register("ICreateBingoGameRepository", CreateBingoGameRepository);
   }
}
