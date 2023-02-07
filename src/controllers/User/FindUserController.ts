import { ControllerProtocol, UseCaseProtocol } from '@/types';
import { FindUserDTO } from '@/useCases';
import { User } from '@/entities';
import { Request, Response } from 'express';
import { BaseError } from '@/utils';

class FindUserController implements ControllerProtocol {
  constructor(
    private readonly findUser: UseCaseProtocol<
      FindUserDTO,
      Omit<User, 'password'>
    >,
  ) {}

  async perform(request: Request, response: Response): Promise<Response> {
    try {
      const userId = request.userId;

      const user = await this.findUser.execute({ userId });

      return response.status(200).json(user);
    } catch (err) {
      if (err instanceof BaseError) {
        return response.status(err.statusCode).json({ error: err.name });
      }
      return response.status(400).json({ error: 'Bad Request' });
    }
  }
}

export { FindUserController };
