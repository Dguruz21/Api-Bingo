import 'reflect-metadata';

import { container } from 'tsyringe';

import { DIExamRegister } from './moduls/exams/DIRegister';
import { DISharedRegister } from './shared/infrastructure/DIRegister';

DISharedRegister.Add(container);

DIExamRegister.Add(container);

export const diContainer = container
