import { ControllerProtocol, UseCaseProtocol } from '@/types';
import { LoginDTO, LoginResponse } from '@/useCases';
import { BaseError } from '@/utils';
import { Request, Response } from 'express';

class LoginController implements ControllerProtocol {
  constructor(
    private readonly login: UseCaseProtocol<LoginDTO, LoginResponse>,
  ) {}
  async perform(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;

      const session = await this.login.execute({ email, password });

      return response.status(200).json(session);
    } catch (err) {
      if (err instanceof BaseError) {
        return response.status(err.statusCode).json({ error: err.name });
      }

      return response.status(400).json({ error: 'Bad Request' });
    }
  }
}

export { LoginController };
