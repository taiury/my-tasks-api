import { Request, Response } from 'express';
import { PrismaClient, User } from '@prisma/client';
import { generateToken } from '../utils/generateToken';

const prisma = new PrismaClient();

export interface SessionControllerProtocol {
  store(req: Request, res: Response): Promise<Response>;
}

export class SessionController implements SessionControllerProtocol {
  public async store(req: Request, res: Response): Promise<Response> {
    const { email, password }: User = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Email or password invalid.' });
    }

    return res.json({
      id: user.id,
      name: user.name,
      age: user.age,
      token: generateToken(user.id),
    });
  }
}
