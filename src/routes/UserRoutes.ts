import { Router } from 'express';

import { authMiddleware } from '@/middlewares';
import { dbClient, UserRepository } from '@/repositories/implementations';
import { checkEmail } from '@/utils';
import {
  CreateUserController,
  FindUserController,
  ModifyUserController,
} from '@/controllers';
import {
  CreateUserUseCase,
  FindUserUseCase,
  ModifyUserUseCase,
} from '@/useCases';

const userRoutes = Router();

const userRepository = new UserRepository(dbClient);

const createUserUseCase = new CreateUserUseCase(userRepository, checkEmail);
const createUserController = new CreateUserController(createUserUseCase);

userRoutes.post('/user', (req, res) => createUserController.perform(req, res));

const modifyUserUseCase = new ModifyUserUseCase(userRepository);
const modifyUserController = new ModifyUserController(modifyUserUseCase);

userRoutes.put('/user', authMiddleware, (req, res) =>
  modifyUserController.perform(req, res),
);

const findUserUseCase = new FindUserUseCase(userRepository);
const findUserController = new FindUserController(findUserUseCase);

userRoutes.get('/user', authMiddleware, (req, res) =>
  findUserController.perform(req, res),
);

export { userRoutes };
