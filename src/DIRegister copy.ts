import 'reflect-metadata';

import { DependencyContainer } from 'tsyringe';

import { RecordsExamController } from './records/controllers/RecordsExamController';
import { RecordsExamService } from './records/application/services/RecordsExamService';
import { RecordsExamRepository } from './records/infrastructure/repositories/RecordsExamRepository';
import { RedisExamRecordsService } from './records/infrastructure/services/RedisExamRecordsService';
import { RedisExamCreationService } from './records/infrastructure/services/RedisExamCreationService';

export class DIExamRegister {
    public static Add(container: DependencyContainer) {
        // controllers
        container.register("RecordsExamController", RecordsExamController);

        // services
        container.register("IRecordsExamService", RecordsExamService);

        // repositories
        container.register("IRecordsExamRepository", RecordsExamRepository);

        // servicios externos
        container.register("IRedisExamRecordsService", RedisExamRecordsService)
                 .register("IRedisExamCreationService", RedisExamCreationService);
    }
}
