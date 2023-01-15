import request from 'supertest';
import { app } from '@/app';
import { dbClient } from '@/repositories/implementations';
import { generateToken } from '@/utils';
import { User } from '@prisma/client';

const newUser = {
  email: 'TASK@gmail.com',
  name: 'TASK',
  password: 'PASSWORD',
  age: 32,
} as User;

describe('TaskRoutes', () => {
  beforeAll(async () => {
    const userAlreadyExists = await dbClient.user.findUnique({
      where: { email: 'TASK@gmail.com' },
    });

    if (userAlreadyExists) {
      await dbClient.task.deleteMany({
        where: { authorId: userAlreadyExists.id },
      });
      await dbClient.user.delete({ where: { email: 'TASK@gmail.com' } });
    }

    await dbClient.user.create({ data: { ...newUser } });
  });

  // POST /task
  it('should create Task in repository return 200', async () => {
    const user = await dbClient.user.findUnique({
      where: { email: 'TASK@gmail.com' },
    });

    if (!user) throw new Error('User not exist');

    await request(app)
      .post('/task')
      .expect(200)
      .set({ authentication: `Bearer ${generateToken(user.id)}` })
      .send({ title: 'TASK' })
      .send({ description: 'NEW_TASK' });
  });

  // POST /task
  it('should not create Task in repository return 401 because TOKEN is invalid', async () => {
    const response = await request(app)
      .post('/task')
      .expect(401)
      .set({ authentication: `Bearer INVALID_TOKEN` })
      .send({ title: 'TASK' })
      .send({ description: 'NEW_TASK' });

    expect(response.body).toEqual(
      expect.objectContaining({
        error: 'Token invalid.',
      }),
    );
  });

  // PUT /task
  it('should edit Task in repository return 200', async () => {
    const user = await dbClient.user.findUnique({
      where: { email: 'TASK@gmail.com' },
    });

    if (!user) throw new Error('User not exist');

    const tasks = await dbClient.task.findMany({
      where: { authorId: user.id },
    });

    await request(app)
      .put('/task')
      .expect(200)
      .set({ authentication: `Bearer ${generateToken(user.id)}` })
      .send({ taskId: tasks[0].id })
      .send({ finalized: true });
  });

  // PUT /task
  it('should not edit Task in repository return 400 because task id is invalid', async () => {
    const user = await dbClient.user.findUnique({
      where: { email: 'TASK@gmail.com' },
    });

    if (!user) throw new Error('User not exist');

    const response = await request(app)
      .put('/task')
      .expect(400)
      .set({ authentication: `Bearer ${generateToken(user.id)}` })
      .send({ taskId: -1 })
      .send({ finalized: true });

    expect(response.body).toEqual(
      expect.objectContaining({
        error: 'Bad Request',
      }),
    );
  });

  //GET /task
  it('shouldfind Task in repository return 200', async () => {
    const user = await dbClient.user.findUnique({
      where: { email: 'TASK@gmail.com' },
    });

    if (!user) throw new Error('User not exist');

    await request(app)
      .get('/task')
      .expect(200)
      .set({ authentication: `Bearer ${generateToken(user.id)}` });
  });

  //GET /task
  it('should not find Task in repository return 401 because token is invalid', async () => {
    const user = await dbClient.user.findUnique({
      where: { email: 'TASK@gmail.com' },
    });

    if (!user) throw new Error('User not exist');

    const response = await request(app)
      .get('/task')
      .expect(401)
      .set({ authentication: `Bearer TOKEN_INVALID` });

    expect(response.body).toEqual(
      expect.objectContaining({
        error: 'Token invalid.',
      }),
    );
  });

  // GET /task/:taskId/
  it('should find Task in repository return 200', async () => {
    const user = await dbClient.user.findUnique({
      where: { email: 'TASK@gmail.com' },
    });

    if (!user) throw new Error('User not exist');

    const tasks = await dbClient.task.findMany({
      where: { authorId: user.id },
    });

    const response = await request(app)
      .get(`/task/${tasks[0].id}/`)
      .expect(200)
      .set({ authentication: `Bearer ${generateToken(user.id)}` });

    expect(response.body).toEqual(
      expect.objectContaining({
        finalized: true,
      }),
    );
  });
});
