import { ControllerProtocol, UseCaseProtocol } from '@/types';
import { CreateTaskDTO } from '@/useCases';
import { Request, Response } from 'express';

class CreateTaskController implements ControllerProtocol {
  constructor(
    private readonly createTask: UseCaseProtocol<CreateTaskDTO, void>,
  ) {}
  async perform(request: Request, response: Response): Promise<Response> {
    try {
      const userId = request.userId as number;
      const { title, description } = request.body as CreateTaskDTO;

      await this.createTask.execute({ userId, title, description });

      return response.status(200).json();
    } catch (err) {
      return response.status(400).json({ error: 'Bad Request' });
    }
  }
}

export { CreateTaskController };