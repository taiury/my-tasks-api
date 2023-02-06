import { ControllerProtocol, UseCaseProtocol } from '@/types';
import { EnableAccountDTO } from '@/useCases';
import { Api400Error, Api401Error, Api404Error } from '@/utils';
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
      const isApi400Error = err instanceof Api400Error;
      const isApi401Error = err instanceof Api401Error;
      const isApi404Error = err instanceof Api404Error;
      if (isApi400Error || isApi401Error || isApi404Error) {
        return response.status(err.statusCode).json({ error: err.name });
      }

      return response.status(400).json({ error: 'Bad Request' });
    }
  }
}

export { EnableAccountController };
