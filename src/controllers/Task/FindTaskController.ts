import { Task } from '@/entities';
import { ControllerProtocol, UseCaseProtocol } from '@/types';
import { FindTaskDTO } from '@/useCases';
import { BaseError } from '@/utils';
import { Request, Response } from 'express';

class FindTaskController implements ControllerProtocol {
  constructor(private readonly findTask: UseCaseProtocol<FindTaskDTO, Task>) {}
  async perform(request: Request, response: Response): Promise<Response> {
    try {
      const userId = request.userId;
      const taskId = +request.params.taskId;

      const task = await this.findTask.execute({ taskId, userId });

      return response.status(200).json(task);
    } catch (err) {
      if (err instanceof BaseError) {
        return response.status(err.statusCode).json({ error: err.name });
      }
      return response.status(400).json({ error: 'Bad Request' });
    }
  }
}

export { FindTaskController };
