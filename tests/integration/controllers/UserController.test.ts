import { PrismaClient } from '@prisma/client';
import request from 'supertest';

import { app } from '../../../src/app';
import { generateToken } from '../../../src/utils/generateToken';

const prisma = new PrismaClient();

describe('UserController', () => {
  afterAll(async () => {
    const userAlreadyExist = await prisma.user.findUnique({
      where: { email: 'EMAIL@gmail.com' },
    });

    if (userAlreadyExist) {
      await prisma.user.delete({ where: { email: 'EMAIL@gmail.com' } });
    }
  });

  it('should create a new user in repository', async () => {
    const response = await request(app)
      .post('/user')
      .send({ email: 'EMAIL@gmail.com' })
      .send({ password: 'PASSWORD' })
      .send({ name: 'TEST' })
      .send({ age: 27 })
      .set('Content-Type', 'application/json')
      .expect(200);

    const user = await prisma.user.findUnique({
      where: { email: 'EMAIL@gmail.com' },
    });

    expect(response.body.name).toEqual(user?.name);
  });

  it('should not create a new user in the repository because the user already exists', async () => {
    const response = await request(app)
      .post('/user')
      .send({ email: 'EMAIL@gmail.com' })
      .send({ password: 'PASSWORD' })
      .send({ name: 'TEST' })
      .send({ age: 27 })
      .set('Content-Type', 'application/json')
      .expect(401);

    expect(response.body.error).toEqual('email already exists');
  });

  it('should not create a new user in the repository because parameters are missing', async () => {
    const response = await request(app)
      .post('/user')
      .send({ email: 'NEW_EMAIL@gmail.com' })
      .send({ password: 'PASSWORD' })
      .send({ age: 27 })
      .set('Content-Type', 'application/json')
      .expect(400);

    expect(response.body.error).toEqual('Bad request');
  });

  it('should update user in repository ', async () => {
    const user = await prisma.user.findUnique({
      where: { email: 'EMAIL@gmail.com' },
    });

    if (!user) {
      expect(true).toBe(false);
      return;
    }

    const response = await request(app)
      .put('/user')
      .send({ age: 22 })
      .set('Content-Type', 'application/json')
      .set('authentication', `Bearer ${generateToken(user.id)}`)
      .expect(200);

    expect(response.body.age).not.toEqual(user.age);
  });

  it('should not update user in repository because User id not exists', async () => {
    const response = await request(app)
      .put('/user')
      .send({ age: 22 })
      .set('Content-Type', 'application/json')
      .set('authentication', `Bearer ${generateToken(999999999)}`)
      .expect(400);

    expect(response.body.error).toEqual('Bad request');
  });

  it('should find user in repository', async () => {
    const user = await prisma.user.findUnique({
      where: { email: 'EMAIL@gmail.com' },
    });

    if (!user) {
      expect(true).toBe(false);
      return;
    }

    const response = await request(app)
      .get('/user')
      .set('authentication', `Bearer ${generateToken(user.id)}`)
      .expect(200);

    expect(response.body.id).toEqual(user.id);
  });

  it('should not find user in repository because user id not exists', async () => {
    const response = await request(app)
      .get('/user')
      .set('authentication', `Bearer ${generateToken(999999999)}`)
      .expect(400);

    expect(response.body.error).toEqual('Bad request');
  });
});
