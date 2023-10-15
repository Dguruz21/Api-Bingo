import 'reflect-metadata';

import { DependencyContainer } from 'tsyringe';

import { BingoController } from './BingoController';

export class DIControllerRegister {
   public static Add(container: DependencyContainer) {
      // controllers
      container.register("BingoController", BingoController);
   }
}
