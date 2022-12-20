import { Router } from 'express';
import { SessionController } from './controllers/SessionController';
import { TaskController } from './controllers/TaskController';
import { UserController } from './controllers/UserController';
import { authMiddleware } from './middlewares/auth';

const routes = Router();

routes.post('/login', new SessionController().store);

routes.post('/user', new UserController().store);
routes.put('/user', authMiddleware, new UserController().update);
routes.get('/user', authMiddleware, new UserController().index);

routes.post('/task', authMiddleware, new TaskController().store);
routes.put('/task', authMiddleware, new TaskController().update);
routes.get('/task', authMiddleware, new TaskController().index);
export { routes };
