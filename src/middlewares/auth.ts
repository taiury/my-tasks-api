import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

type authMiddlewareProps = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;

interface DecodedProtocol {
  userId: number;
  iat: number;
  exp: number;
}

const authMiddleware: authMiddlewareProps = async (req, res, next) => {
  try {
    const { authentication } = req.headers;

    if (typeof authentication !== 'string') {
      return res.status(401).json({ error: 'Token malformated.' });
    }

    const parts = authentication.split(' ');

    if (parts.length !== 2) {
      return res.status(401).json({ error: 'Token malformated.' });
    }

    const [bearer, token] = parts;

    if (!/Bearer/.test(bearer)) {
      return res.status(401).json({ error: 'Token malformated.' });
    }

    jwt.verify(token, process.env.SECRET as string, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token invalid2.' });
      }

      req.userId = (decoded as DecodedProtocol).userId;
      next();
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export { authMiddleware, DecodedProtocol };
