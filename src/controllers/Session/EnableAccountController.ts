import { ControllerProtocol, UseCaseProtocol } from '@/types';
import { EnableAccountDTO } from '@/useCases';
import { BaseError } from '@/utils';
import { Request, Response } from 'express';

class EnableAccountController implements ControllerProtocol {
  constructor(
    private readonly enableAccount: UseCaseProtocol<EnableAccountDTO, void>,
  ) {}

  async perform(request: Request, response: Response): Promise<Response> {
    try {
      const { email, code } = request.body;

      await this.enableAccount.execute({ email, code });

      return response.status(200).json();
    } catch (err) {
      if (err instanceof BaseError) {
        return response.status(err.statusCode).json({ error: err.name });
      }

      return response.status(400).json({ error: 'Bad Request' });
    }
  }
}

export { EnableAccountController };
