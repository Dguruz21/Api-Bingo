import "reflect-metadata"

import { DataSource } from "typeorm";

import { MedicalExamType } from "../../../moduls/exams/records/domain/entities/MedicalExamType";
import { MedicalExamTypeChannel } from "../../../moduls/exams/records/domain/entities/MedicalExamTypeChannel";
import { IDatabaseConfig } from "../../application/interfaces/IDatabaseConfig";
import { AwsSSMUtil } from "../../application/utils/AwsSSMUtil";

export class DatabaseConfig implements IDatabaseConfig {
  private host: string;
  private username: string;
  private password: string;
  private database: string;
  private dataSource: DataSource;

  async getParameterStores() {
    const param = process.env.HEALTH_DB_DATASOURCE;

    const databaseParam = await AwsSSMUtil.loadParameters(param!);
    const datasource = JSON.parse(databaseParam);

    this.host = datasource.host;
    this.username = datasource.user;
    this.password = datasource.password;
    this.database = datasource.database;
  }

  async createConnection(): Promise<DataSource> {
    if (this.dataSource) {
      return this.dataSource;
    }

    await this.getParameterStores();

    this.dataSource = new DataSource({
      type: "mysql",
      host: this.host,
      port: 3306,
      username: this.username,
      password: this.password,
      database: this.database,
      synchronize: false,
      logging: false,
      entities: [MedicalExamType, MedicalExamTypeChannel],
      migrations: [],
      subscribers: [],
    });

    return await this.dataSource.initialize();
  }
}
