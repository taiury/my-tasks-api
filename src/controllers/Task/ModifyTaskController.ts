import { ControllerProtocol, UseCaseProtocol } from '@/types';
import { ModifyTaskDTO, modifyTaskSchema } from '@/useCases';
import { Request, Response } from 'express';

class ModifyTaskController implements ControllerProtocol {
  constructor(
    private readonly modifyTask: UseCaseProtocol<ModifyTaskDTO, void>,
  ) {}
  async perform(request: Request, response: Response): Promise<Response> {
    try {
      const { taskId, userId, description, finalized, title } =
        modifyTaskSchema.parse({
          ...request.body,
          userId: request.userId,
        });

      await this.modifyTask.execute({
        userId,
        taskId,
        title,
        description,
        finalized,
      });

      return response.status(200).json();
    } catch (err) {
      return response.status(400).json({ error: 'Bad Request' });
    }
  }
}

export { ModifyTaskController };
