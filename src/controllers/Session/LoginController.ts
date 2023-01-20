import { ControllerProtocol, UseCaseProtocol } from '@/types';
import { LoginDTO, LoginResponse, loginSchema } from '@/useCases';
import { Request, Response } from 'express';

class LoginController implements ControllerProtocol {
  constructor(
    private readonly login: UseCaseProtocol<LoginDTO, LoginResponse>,
  ) {}
  async perform(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = loginSchema.parse(request.body);

      const session = await this.login.execute({ email, password });

      return response.status(200).json(session);
    } catch (err) {
      return response.status(400).json({ error: 'Bad Request' });
    }
  }
}

export { LoginController };
