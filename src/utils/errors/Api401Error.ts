import { BaseError } from './BaseError';
import { httpStatusCodes } from './httpStatusCodes';

class Api401Error extends BaseError {
  constructor(name: string) {
    super(name, httpStatusCodes.Unauthorized, false, 'Unauthorized');
  }
}

export { Api401Error };
