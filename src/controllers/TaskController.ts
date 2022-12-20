import { Request, Response } from 'express';
import { PrismaClient, Task } from '@prisma/client';

interface TaskControllerProtocol {
  store(req: Request, res: Response): Promise<Response>;
  update(req: Request, res: Response): Promise<Response>;
  index(req: Request, res: Response): Promise<Response>;
}

const prisma = new PrismaClient();

class TaskController implements TaskControllerProtocol {
  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const { title, description }: Task = req.body;
      const userId = req.userId;

      if (typeof userId !== 'number') {
        return res.status(400).json({ error: 'Bad request' });
      }

      const task = await prisma.task.create({
        data: { title, description, authorId: userId, finalized: false },
      });

      return res.json({ ...task });
    } catch (error) {
      return res.status(400).json({ error: 'Bad request' });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id, title, description, finalized }: Task = req.body;

      const userId = req.userId;

      const taskOwner = await prisma.task.findUnique({ where: { id } });

      if (taskOwner?.authorId !== userId) {
        return res.status(401).json({ error: 'User is not the task owner' });
      }

      const task = await prisma.task.update({
        where: {
          id,
        },
        data: {
          title,
          description,
          finalized,
          deleteAt: finalized ? new Date() : null,
        },
      });

      return res.json({ ...task });
    } catch (error) {
      return res.status(400).json({ error: 'Bad request' });
    }
  }

  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.userId;

      const tasks = await prisma.task.findMany({ where: { authorId: userId } });

      return res.json(tasks);
    } catch (error) {
      return res.status(400).json({ error: 'Bad request' });
    }
  }
}

export { TaskController, TaskControllerProtocol };
