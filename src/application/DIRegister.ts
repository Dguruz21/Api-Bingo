import 'reflect-metadata';

import { DependencyContainer } from 'tsyringe';

import { BingoService } from './services/BingoService';

export class DIApplicationRegister {
   public static Add(container: DependencyContainer) {
      // services
      container.register("IBingoService", BingoService);
   }
}
