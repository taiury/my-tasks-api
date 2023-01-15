import { ControllerProtocol, UseCaseProtocol } from '@/types';
import { ModifyTaskDTO } from '@/useCases';
import { Request, Response } from 'express';

class ModifyTaskController implements ControllerProtocol {
  constructor(
    private readonly modifyTask: UseCaseProtocol<ModifyTaskDTO, void>,
  ) {}
  async perform(request: Request, response: Response): Promise<Response> {
    try {
      const userId = request.userId;
      const { taskId, title, description, finalized } =
        request.body as ModifyTaskDTO;

      if (!userId) throw new Error('User Id is invalid');

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
