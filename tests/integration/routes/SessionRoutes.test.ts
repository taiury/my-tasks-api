import request from 'supertest';
import { app } from '@/app';
import { dbClient } from '@/repositories/implementations';
import { User } from '@prisma/client';

const newUser = {
  email: 'TEST@gmail.com',
  name: 'TEST',
  password: 'PASSWORD',
  age: 32,
  isEnabled: true,
} as User;

describe('SessionRoutes', () => {
  beforeAll(async () => {
    const LoginUserAlreadyExists = await dbClient.user.findUnique({
      where: { email: 'TEST@gmail.com' },
    });

    const EnableAccountUserAlreadyExists = await dbClient.user.findUnique({
      where: { email: 'Enable_Account@gmail.com' },
    });

    if (LoginUserAlreadyExists) {
      await dbClient.user.delete({ where: { email: 'TEST@gmail.com' } });
    }
    if (EnableAccountUserAlreadyExists) {
      await dbClient.user.delete({
        where: { email: 'Enable_Account@gmail.com' },
      });
    }

    await dbClient.user.create({ data: { ...newUser } });
    await dbClient.user.create({
      data: {
        ...newUser,
        email: 'Enable_Account@gmail.com',
        isEnabled: false,
        email_code: 9,
      },
    });
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

  // POST /enable
  it('should enable account and return 200', async () => {
    await request(app)
      .post('/enable')
      .expect(200)
      .send({ email: 'Enable_Account@gmail.com' })
      .send({ code: 9 });
  });

  it('should not enable account because email code is invalid', async () => {
    const response = await request(app)
      .post('/enable')
      .expect(401)
      .send({ email: 'Enable_Account@gmail.com' })
      .send({ code: 0 });

    expect(response.body).toEqual(
      expect.objectContaining({
        error: 'Email code is invalid.',
      }),
    );
  });

  it('should not enable account because email not exists', async () => {
    const response = await request(app)
      .post('/enable')
      .expect(404)
      .send({ email: 'USER_INVALID@gmail.com' })
      .send({ code: 9 });

    expect(response.body).toEqual(
      expect.objectContaining({
        error: 'User not found.',
      }),
    );
  });

  it('should not enable account because parameter code is undefined', async () => {
    const response = await request(app)
      .post('/enable')
      .expect(400)
      .send({ email: 'USER_INVALID@gmail.com' })
      .send({ code: undefined });

    expect(response.body).toEqual(
      expect.objectContaining({
        error: 'Parameters are badly formatted.',
      }),
    );
  });
});
