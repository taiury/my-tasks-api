import { Task } from '@/entities';
import { ControllerProtocol, UseCaseProtocol } from '@/types';
import { FindTaskDTO } from '@/useCases';
import { Request, Response } from 'express';

class FindTaskController implements ControllerProtocol {
  constructor(private readonly findTask: UseCaseProtocol<FindTaskDTO, Task>) {}
  async perform(request: Request, response: Response): Promise<Response> {
    try {
      const userId = request.userId;
      const { taskId } = request.params;

      if (!userId) throw new Error('User Id is invalid');
      if (isNaN(+taskId)) throw new Error('Task id is invalid');

      const task = await this.findTask.execute({ taskId: +taskId, userId });

      return response.status(200).json(task);
    } catch (err) {
      return response.status(400).json({ error: 'Bad Request' });
    }
  }
}

export { FindTaskController };
