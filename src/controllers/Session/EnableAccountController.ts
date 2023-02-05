import { ControllerProtocol, UseCaseProtocol } from '@/types';
import { EnableAccountDTO, enableAccountSchema } from '@/useCases';
import { Api401Error, Api404Error } from '@/utils';
import { Request, Response } from 'express';

class EnableAccountController implements ControllerProtocol {
  constructor(
    private readonly enableAccount: UseCaseProtocol<EnableAccountDTO, void>,
  ) {}

  async perform(request: Request, response: Response): Promise<Response> {
    try {
      const { email, code } = enableAccountSchema.parse(request.body);

      await this.enableAccount.execute({ email, code });

      return response.status(200).json();
    } catch (err) {
      const isApi401Error = err instanceof Api401Error;
      const isApi404Error = err instanceof Api404Error;

      if (isApi401Error || isApi404Error) {
        return response.status(err.statusCode).json({ error: err.name });
      }

      return response.status(400).json({ error: 'Bad Request' });
    }
  }
}

export { EnableAccountController };
