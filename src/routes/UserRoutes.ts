import { Router } from 'express';

import { authMiddleware } from '@/middlewares';
import { dbClient, UserRepository } from '@/repositories/implementations';
import { checkEmail, GenerateEmailConfirmationCode } from '@/utils';
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
import { MailProvider } from '@/providers';

const userRoutes = Router();

const userRepository = new UserRepository(dbClient);
const mailProvider = new MailProvider();
const generateCode = new GenerateEmailConfirmationCode(userRepository);

const createUserUseCase = new CreateUserUseCase(
  userRepository,
  mailProvider,
  generateCode,
  checkEmail,
);
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
