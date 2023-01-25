import { BaseError } from './BaseError';
import { httpStatusCodes } from './httpStatusCodes';

class Api400Error extends BaseError {
  constructor(name: string) {
    super(name, httpStatusCodes.BAD_REQUEST, false, 'Bad Request');
  }
}

export { Api400Error };
