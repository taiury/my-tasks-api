import { ControllerProtocol, UseCaseProtocol } from '@/types';
import { CreateUserDTO } from '@/useCases';
import { Request, Response } from 'express';

class CreateUserController implements ControllerProtocol {
  constructor(
    private readonly createUser: UseCaseProtocol<CreateUserDTO, void>,
  ) {}
  async perform(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password, name, age } = request.body as CreateUserDTO;

      await this.createUser.execute({ email, password, name, age });
      return response.status(200).json();
    } catch (err) {
      return response.status(400).json({
        error: 'Bad Request',
      });
    }
  }
}

export { CreateUserController };
