import { ControllerProtocol, UseCaseProtocol } from '@/types';
import { CreateTaskDTO } from '@/useCases';
import { BaseError } from '@/utils';
import { Request, Response } from 'express';

class CreateTaskController implements ControllerProtocol {
  constructor(
    private readonly createTask: UseCaseProtocol<CreateTaskDTO, void>,
  ) {}
  async perform(request: Request, response: Response): Promise<Response> {
    try {
      const userId = request.userId;
      const { title, description } = request.body;

      await this.createTask.execute({ userId, title, description });

      return response.status(200).json();
    } catch (err) {
      if (err instanceof BaseError) {
        return response.status(err.statusCode).json({ error: err.name });
      }
      return response.status(400).json({ error: 'Bad Request' });
    }
  }
}

export { CreateTaskController };
