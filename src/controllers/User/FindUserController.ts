import { ControllerProtocol, UseCaseProtocol } from '@/types';
import { FindUserDTO, findUserSchema } from '@/useCases';
import { User } from '@/entities';
import { Request, Response } from 'express';

class FindUserController implements ControllerProtocol {
  constructor(
    private readonly findUser: UseCaseProtocol<
      FindUserDTO,
      Omit<User, 'password'>
    >,
  ) {}

  async perform(request: Request, response: Response): Promise<Response> {
    try {
      const { userId } = findUserSchema.parse({ userId: request.userId });
      const user = await this.findUser.execute({ userId });

      return response.status(200).json(user);
    } catch (err) {
      return response.status(400).json({
        error: 'Bad Request',
      });
    }
  }
}

export { FindUserController };
