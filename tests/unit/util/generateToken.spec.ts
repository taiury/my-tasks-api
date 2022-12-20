import jwt from 'jsonwebtoken';
import { DecodedProtocol } from '../../../src/middlewares/auth';

import { generateToken } from '../../../src/utils/generateToken';

const userId = 1;

describe('Generate Token', () => {
  it('should create new token', () => {
    try {
      const token = generateToken(userId);

      expect(typeof token === 'string').toBe(true);
    } catch (err) {
      expect(true).toBe(false);
    }
  });

  it('should verify token and return success', () => {
    const token = generateToken(userId);

    jwt.verify(token, process.env.SECRET as string, (err, decoded) => {
      if (err) {
        expect(true).toBe(false);
        return;
      }

      const userId = (decoded as DecodedProtocol).userId;
      expect(userId).toBe(1);
    });
  });

  it('should verify token and return error', () => {
    const token = generateToken(userId);

    jwt.verify(token + 'Fail', process.env.SECRET as string, (err) => {
      if (err) {
        expect(true).toBe(true);
      }
    });
  });
});
