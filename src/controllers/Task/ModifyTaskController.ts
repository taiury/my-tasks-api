import { ControllerProtocol, UseCaseProtocol } from '@/types';
import { ModifyTaskDTO } from '@/useCases';
import { BaseError } from '@/utils';
import { Request, Response } from 'express';

class ModifyTaskController implements ControllerProtocol {
  constructor(
    private readonly modifyTask: UseCaseProtocol<ModifyTaskDTO, void>,
  ) {}
  async perform(request: Request, response: Response): Promise<Response> {
    try {
      const userId = request.userId;
      const { taskId, description, finalized, title } = request.body;

      await this.modifyTask.execute({
        userId,
        taskId,
        title,
        description,
        finalized,
      });

      return response.status(200).json();
    } catch (err) {
      if (err instanceof BaseError) {
        return response.status(err.statusCode).json({ error: err.name });
      }
      return response.status(400).json({ error: 'Bad Request' });
    }
  }
}

export { ModifyTaskController };
