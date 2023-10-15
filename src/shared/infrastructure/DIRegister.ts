import "reflect-metadata";

import { DependencyContainer } from "tsyringe";

import { DatabaseConfig } from "./data/DatabaseConfig";

export class DISharedRegister {
  public static Add(container: DependencyContainer) {
    // singletons
    container.registerSingleton("IDatabaseConfig", DatabaseConfig);
  }
}
