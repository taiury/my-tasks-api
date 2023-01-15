import { Router } from 'express';

import { authMiddleware } from '@/middlewares';
import { dbClient, TaskRepository } from '@/repositories/implementations';
import {
  CreateTaskUseCase,
  FindAllTaskUseCase,
  FindTaskUseCase,
  ModifyTaskUseCase,
} from '@/useCases';
import {
  CreateTaskController,
  FindAllTaskController,
  FindTaskController,
  ModifyTaskController,
} from '@/controllers';

const taskRoutes = Router();

const taskRepository = new TaskRepository(dbClient);

const createTaskUseCase = new CreateTaskUseCase(taskRepository);
const createTaskController = new CreateTaskController(createTaskUseCase);

taskRoutes.post('/task', authMiddleware, (req, res) =>
  createTaskController.perform(req, res),
);

const modifyTaskUseCase = new ModifyTaskUseCase(taskRepository);
const modifyTaskController = new ModifyTaskController(modifyTaskUseCase);
taskRoutes.put('/task', authMiddleware, (req, res) =>
  modifyTaskController.perform(req, res),
);

const findAllTaskUseCase = new FindAllTaskUseCase(taskRepository);
const findAllTaskController = new FindAllTaskController(findAllTaskUseCase);
taskRoutes.get('/task', authMiddleware, (req, res) =>
  findAllTaskController.perform(req, res),
);

const findTaskUseCase = new FindTaskUseCase(taskRepository);
const findTaskController = new FindTaskController(findTaskUseCase);
taskRoutes.get('/task/:taskId/', authMiddleware, (req, res) =>
  findTaskController.perform(req, res),
);

export { taskRoutes };
