import { ControllerProtocol, UseCaseProtocol } from '@/types';
import { CreateUserDTO } from '@/useCases';
import { BaseError } from '@/utils';
import { Request, Response } from 'express';

class CreateUserController implements ControllerProtocol {
  constructor(
    private readonly createUser: UseCaseProtocol<CreateUserDTO, void>,
  ) {}
  async perform(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password, name, age } = request.body;

      await this.createUser.execute({ email, password, name, age });
      return response.status(200).json();
    } catch (err) {
      if (err instanceof BaseError) {
        return response.status(err.statusCode).json({ error: err.name });
      }
      return response.status(400).json({ error: 'Bad Request' });
    }
  }
}

export { CreateUserController };
