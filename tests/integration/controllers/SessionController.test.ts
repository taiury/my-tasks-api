import request from 'supertest';
import { PrismaClient } from '@prisma/client';

import { app } from '../../../src/app';

const prisma = new PrismaClient();

describe('SessionController', () => {
  beforeAll(async () => {
    const userAlreadyExist = await prisma.user.findUnique({
      where: { email: 'test@gmail.com' },
    });

    if (userAlreadyExist) {
      await prisma.user.delete({ where: { email: 'test@gmail.com' } });
    }

    await prisma.user.create({
      data: {
        name: 'TEST',
        age: 21,
        email: 'test@gmail.com',
        password: 'PASSWORD',
      },
    });
  });

  afterAll(async () => {
    const userAlreadyExist = await prisma.user.findUnique({
      where: { email: 'test@gmail.com' },
    });

    if (!userAlreadyExist) return;

    await prisma.user.delete({ where: { email: 'test@gmail.com' } });
  });

  it('should verify user credentials and approve', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'test@gmail.com' })
      .send({ password: 'PASSWORD' })
      .set('Content-Type', 'application/json')
      .expect(200);

    expect(response.body.name).toEqual('TEST');
  });

  it('should verify user credentials and repprove because email is invalid', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'Error@gmail.com' })
      .send({ password: 'PASSWORD' })
      .set('Content-Type', 'application/json')
      .expect(401);

    expect(response.body.error).toEqual('Email or password invalid.');
  });

  it('should verify user credentials and repprove because password is invalid', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'test@gmail.com' })
      .send({ password: 'ERROR' })
      .set('Content-Type', 'application/json')
      .expect(401);

    expect(response.body.error).toEqual('Email or password invalid.');
  });

  it('should verify user credentials and repprove because email is undefined', async () => {
    const response = await request(app)
      .post('/login')
      .send({ password: '123' })
      .set('Content-Type', 'application/json')
      .expect(400);

    expect(response.body.error).toEqual('Bad request.');
  });
});
