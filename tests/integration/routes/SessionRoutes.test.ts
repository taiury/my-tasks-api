import request from 'supertest';
import { app } from '@/app';
import { dbClient } from '@/repositories/implementations';
import { User } from '@prisma/client';

const newUser = {
  email: 'TEST@gmail.com',
  name: 'TEST',
  password: 'PASSWORD',
  age: 32,
} as User;

describe('SessionRoutes', () => {
  beforeAll(async () => {
    const userAlreadyExists = await dbClient.user.findUnique({
      where: { email: 'TEST@gmail.com' },
    });

    if (userAlreadyExists) {
      await dbClient.user.delete({ where: { email: 'TEST@gmail.com' } });
    }

    await dbClient.user.create({ data: { ...newUser } });
  });

  // POST /login
  it('should return 200', async () => {
    const response = await request(app)
      .post('/login')
      .expect(200)
      .send({ email: 'TEST@gmail.com' })
      .send({ password: 'PASSWORD' });

    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'TEST',
      }),
    );
  });

  // POST /login
  it('should return 400 because E-mail is invalid.', async () => {
    const response = await request(app)
      .post('/login')
      .expect(400)
      .send({ email: 'USER_INVALID@gmail.com' })
      .send({ password: 'PASSWORD' });

    expect(response.body).toEqual(
      expect.objectContaining({
        error: 'Bad Request',
      }),
    );
  });

  // POST /login
  it('should return 400 because PASSWORD is invalid.', async () => {
    const response = await request(app)
      .post('/login')
      .expect(400)
      .send({ email: 'USER_INVALID@gmail.com' })
      .send({ password: 'INVALID_PASSWORD' });

    expect(response.body).toEqual(
      expect.objectContaining({
        error: 'Bad Request',
      }),
    );
  });
});
