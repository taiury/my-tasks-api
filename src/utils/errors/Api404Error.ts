import { BaseError } from './BaseError';
import { httpStatusCodes } from './httpStatusCodes';

class Api404Error extends BaseError {
  constructor(name: string) {
    super(name, httpStatusCodes.NOT_FOUND, false, 'Not Found');
  }
}

export { Api404Error };
