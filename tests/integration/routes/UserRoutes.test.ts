import request from 'supertest';
import { app } from '@/app';
import { dbClient } from '@/repositories/implementations';
import { generateToken } from '@/utils';

describe('UserRoutes', () => {
  beforeAll(async () => {
    const userAlreadyExists = await dbClient.user.findUnique({
      where: { email: 'TEST@gmail.com' },
    });

    if (userAlreadyExists) {
      await dbClient.user.delete({ where: { email: 'TEST@gmail.com' } });
    }
  });

  // POST /user
  it('should create user in repository and return status 200', async () => {
    await request(app)
      .post('/user')
      .expect(200)
      .send({ email: 'TEST@gmail.com' })
      .send({ password: 'PASSWORD' })
      .send({ name: 'TEST' })
      .send({ age: 32 });
  });

  // POST /user
  it('should not create user in repository and return status 401 because user already exists', async () => {
    const response = await request(app)
      .post('/user')
      .expect(401)
      .send({ email: 'TEST@gmail.com' })
      .send({ password: 'PASSWORD' })
      .send({ name: 'TEST' })
      .send({ age: 32 });

    expect(response.body).toEqual(
      expect.objectContaining({
        error: 'Email already exists.',
      }),
    );
  });

  // PUT /user
  it('should edit user in repository and return status 200', async () => {
    const user = await dbClient.user.findUnique({
      where: { email: 'TEST@gmail.com' },
    });

    if (!user) throw new Error('User not exist');

    await request(app)
      .put('/user')
      .expect(200)
      .set({ authentication: `Bearer ${generateToken(user.id)}` })
      .send({ password: 'PASSWORD' })
      .send({ name: 'TEST' })
      .send({ age: 37 });
  });

  // PUT /user
  it('should not edit user in repository and return status 400 because user id not exists', async () => {
    const response = await request(app)
      .put('/user')
      .expect(400)
      .set({ authentication: `Bearer ${generateToken(-1)}` })
      .send({ password: 'PASSWORD' })
      .send({ name: 'TEST' })
      .send({ age: 32 });

    expect(response.body).toEqual(
      expect.objectContaining({
        error: 'Bad Request',
      }),
    );
  });

  // GET /user
  it('should find user in repository and return status 200', async () => {
    const user = await dbClient.user.findUnique({
      where: { email: 'TEST@gmail.com' },
    });

    if (!user) throw new Error('User not exist');

    const response = await request(app)
      .get('/user')
      .expect(200)
      .set({ authentication: `Bearer ${generateToken(user.id)}` });

    expect(response.body).toEqual(
      expect.objectContaining({
        age: 37,
      }),
    );
  });

  // GET /user
  it('should not find user in repository and return status 404 because user id is invalid', async () => {
    const user = await dbClient.user.findUnique({
      where: { email: 'TEST@gmail.com' },
    });

    if (!user) throw new Error('User not exist');

    const response = await request(app)
      .get('/user')
      .expect(404)
      .set({ authentication: `Bearer ${generateToken(-1)}` });

    expect(response.body).toEqual(
      expect.objectContaining({
        error: 'User id invalid.',
      }),
    );
  });
});
