import { ControllerProtocol, UseCaseProtocol } from '@/types';
import { FindAllTaskDTO } from '@/useCases';
import { Task } from '@/entities';
import { Request, Response } from 'express';
import { BaseError } from '@/utils';

class FindAllTaskController implements ControllerProtocol {
  constructor(
    private readonly findTask: UseCaseProtocol<FindAllTaskDTO, Task[]>,
  ) {}
  async perform(request: Request, response: Response): Promise<Response> {
    try {
      const userId = request.userId;

      const task = await this.findTask.execute({ userId });

      return response.status(200).json(task);
    } catch (err) {
      if (err instanceof BaseError) {
        return response.status(err.statusCode).json({ error: err.name });
      }
      return response.status(400).json({ error: 'Bad Request' });
    }
  }
}

export { FindAllTaskController };
