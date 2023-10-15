import 'reflect-metadata';

import { container } from 'tsyringe';

import { DIControllerRegister } from './controllers/DIRegister';
import { DIApplicationRegister } from './application/DIRegister';
import { DIInfrastructureRegister } from './infrastructure/DIRegister';

// controllers
DIControllerRegister.Add(container);

// aplication
DIApplicationRegister.Add(container);

// infrastructure
DIInfrastructureRegister.Add(container);

export const diContainer = container
