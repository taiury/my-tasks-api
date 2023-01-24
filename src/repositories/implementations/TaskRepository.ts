import { Task } from '@/entities';
import { PrismaClient } from '@prisma/client';
import { TaskRepositoryProtocol } from '../TaskRepositoryProtocol';

class TaskRepository implements TaskRepositoryProtocol {
  constructor(private readonly dbClient: PrismaClient) {}
  async add({ authorId, title, description }: Task): Promise<void> {
    await this.dbClient.task.create({
      data: { authorId, title, description, finalized: false },
    });
  }

  async findTaskById(taskId: number): Promise<Task | null> {
    const task = await this.dbClient.task.findUnique({ where: { id: taskId } });
    return task as Task | null;
  }

  async findTasksByUserId(authorId: number): Promise<Task[]> {
    const tasks = await this.dbClient.task.findMany({
      where: { authorId },
    });
    return tasks as Task[];
  }

  async modify({ id, title, description, finalized }: Task): Promise<void> {
    await this.dbClient.task.update({
      where: { id },
      data: {
        title,
        description,
        finalized,
        deleteAt: finalized ? new Date() : null,
      },
    });
  }
}

export { TaskRepository };
