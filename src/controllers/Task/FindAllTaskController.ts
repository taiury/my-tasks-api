import { ControllerProtocol, UseCaseProtocol } from '@/types';
import { FindAllTaskDTO } from '@/useCases';
import { Task } from '@/entities';
import { Request, Response } from 'express';

class FindAllTaskController implements ControllerProtocol {
  constructor(
    private readonly findTask: UseCaseProtocol<FindAllTaskDTO, Task[]>,
  ) {}
  async perform(request: Request, response: Response): Promise<Response> {
    try {
      const userId = request.userId;

      if (!userId) throw new Error('User Id is invalid');

      const task = await this.findTask.execute({ userId });

      return response.status(200).json(task);
    } catch (err) {
      return response.status(400).json({ error: 'Bad Request' });
    }
  }
}

export { FindAllTaskController };
