import { Request, Response } from 'express';
import { PrismaClient, User } from '@prisma/client';
import { generateToken } from '../utils/generateToken';

const prisma = new PrismaClient();

export interface UserControllerProtocol {
  store(req: Request, res: Response): Promise<Response>;
}

export class UserController implements UserControllerProtocol {
  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password, name }: User = req.body;

      const user = await prisma.user.create({
        data: {
          email,
          password,
          name,
        },
      });
      return res.json({
        id: user.id,
        name: user.name,
        age: user.age,
        token: generateToken(user.id),
      });
    } catch (error) {
      return res.status(400).json({ error: 'Email already existe' });
    }
  }
}
