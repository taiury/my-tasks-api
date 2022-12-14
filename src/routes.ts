import { Router } from 'express';
import { SessionController } from './controllers/SessionController';
import { UserController } from './controllers/UserController';

const routes = Router();

routes.post('/login', new SessionController().store);

routes.post('/user/create', new UserController().store);

export { routes };
