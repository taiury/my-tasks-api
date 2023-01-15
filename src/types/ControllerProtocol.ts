import { Request, Response } from 'express';

interface ControllerProtocol {
  perform(request: Request, response: Response): Promise<Response>;
}

export { ControllerProtocol };
