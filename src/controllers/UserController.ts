import { Request, Response } from 'express';
import { PrismaClient, User } from '@prisma/client';
import { generateToken } from '../utils/generateToken';

const prisma = new PrismaClient();

export interface UserControllerProtocol {
  store(req: Request, res: Response): Promise<Response>;
  update(req: Request, res: Response): Promise<Response>;
  index(req: Request, res: Response): Promise<Response>;
}

export class UserController implements UserControllerProtocol {
  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password, name, age }: User = req.body;

      const userAlreadyExists = await prisma.user.findUnique({
        where: { email },
      });

      if (userAlreadyExists) {
        return res.status(401).json({ error: 'email already exists' });
      }

      const user = await prisma.user.create({
        data: {
          email,
          password,
          name,
          age,
        },
      });

      return res.json({
        id: user.id,
        name: user.name,
        age: user.age,
        token: generateToken(user.id),
      });
    } catch (error) {
      return res.status(400).json({ error: 'Bad request' });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { name, password, age }: User = req.body;
      const userId = req.userId;

      if (typeof userId !== 'number') {
        return res.status(400).json({ error: 'Bad request' });
      }

      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          name,
          password,
          age,
        },
      });

      return res.json({ user });
    } catch (error) {
      return res.status(400).json({ error: 'Bad request' });
    }
  }

  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.userId;

      if (typeof userId !== 'number') {
        return res.status(400).json({ error: 'Bad request' });
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { tasks: { where: { authorId: userId } } },
      });

      return res.json({ ...user });
    } catch (error) {
      return res.status(400).json({ error: 'Bad request' });
    }
  }
}
