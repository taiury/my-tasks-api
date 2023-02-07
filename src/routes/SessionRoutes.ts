import { EnableAccountController, LoginController } from '@/controllers';
import { dbClient, UserRepository } from '@/repositories/implementations';
import { EnableAccountUseCase, LoginUseCase } from '@/useCases';
import { generateToken } from '@/utils';
import { Router } from 'express';

const sessionRoutes = Router();

const userRepository = new UserRepository(dbClient);
const loginUseCase = new LoginUseCase(userRepository, generateToken);
const loginController = new LoginController(loginUseCase);

sessionRoutes.post('/login', (req, res) => loginController.perform(req, res));

const enableAccountUseCase = new EnableAccountUseCase(userRepository);
const enableAccountController = new EnableAccountController(
  enableAccountUseCase,
);
sessionRoutes.post('/enable', (req, res) => {
  return enableAccountController.perform(req, res);
});

export { sessionRoutes };
