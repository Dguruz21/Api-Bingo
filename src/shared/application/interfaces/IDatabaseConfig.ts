import { DataSource } from "typeorm";

export interface IDatabaseConfig {
  createConnection(): Promise<DataSource>;
}
