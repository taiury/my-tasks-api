import { ControllerProtocol, UseCaseProtocol } from '@/types';
import { ModifyUserDTO } from '@/useCases';
import { BaseError } from '@/utils';
import { Request, Response } from 'express';

class ModifyUserController implements ControllerProtocol {
  constructor(
    private readonly modifyUser: UseCaseProtocol<ModifyUserDTO, void>,
  ) {}
  async perform(request: Request, response: Response): Promise<Response> {
    try {
      const userId = request.userId;
      const { password, name, age } = request.body;

      await this.modifyUser.execute({ userId, password, name, age });

      return response.status(200).json();
    } catch (err) {
      if (err instanceof BaseError) {
        return response.status(err.statusCode).json({ error: err.name });
      }
      return response.status(400).json({ error: 'Bad Request' });
    }
  }
}

export { ModifyUserController };
