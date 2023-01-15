import { ControllerProtocol, UseCaseProtocol } from '@/types';
import { ModifyUserDTO } from '@/useCases';
import { Request, Response } from 'express';

class ModifyUserController implements ControllerProtocol {
  constructor(
    private readonly modifyUser: UseCaseProtocol<ModifyUserDTO, void>,
  ) {}
  async perform(request: Request, response: Response): Promise<Response> {
    try {
      const userId = request.userId as number;
      const { password, name, age } = request.body as ModifyUserDTO;

      await this.modifyUser.execute({ userId, password, name, age });

      return response.status(200).json();
    } catch (err) {
      return response.status(400).json({ error: 'Bad Request' });
    }
  }
}

export { ModifyUserController };
