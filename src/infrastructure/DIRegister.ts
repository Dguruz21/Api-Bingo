import 'reflect-metadata';

import { DependencyContainer } from 'tsyringe';

import { BingoRepository } from './repositories/BingoRepository';

export class DIInfrastructureRegister {
   public static Add(container: DependencyContainer) {
      // repositories
      container.register("IBingoRepository", BingoRepository);
   }
}
