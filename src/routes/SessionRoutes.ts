import { LoginController } from '@/controllers';
import { dbClient, UserRepository } from '@/repositories/implementations';
import { LoginUseCase } from '@/useCases';
import { generateToken } from '@/utils';
import { Router } from 'express';

const sessionRoutes = Router();

const userRepository = new UserRepository(dbClient);
const loginUseCase = new LoginUseCase(userRepository, generateToken);
const loginController = new LoginController(loginUseCase);

sessionRoutes.post('/login', (req, res) => loginController.perform(req, res));

export { sessionRoutes };
