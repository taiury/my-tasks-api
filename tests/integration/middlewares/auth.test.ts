import request from 'supertest';

import { app } from '../../../src/app';
import { authMiddleware } from '../../../src/middlewares/auth';
import { generateToken } from '../../../src/utils/generateToken';

app.get('/test', authMiddleware, (req, res) => {
  return res.json({ userId: req.userId });
});

describe('authMiddleware', () => {
  it('should authenticate user by token', async () => {
    const response = await request(app)
      .get('/test')
      .set('authentication', `Bearer ${generateToken(1)}`)
      .expect(200);

    expect(response.body.userId === 1);
  });

  it('should not authenticate user because "Bearer" and token have no space between them', async () => {
    const response = await request(app)
      .get('/test')
      .set('authentication', `Bearer${generateToken(1)}`)
      .expect(401);

    expect(response.body.error).toEqual('Token malformated.');
  });

  it('should not authenticate the user because "Bearer" is badly formatted', async () => {
    const response = await request(app)
      .get('/test')
      .set('authentication', `bearer ${generateToken(1)}`)
      .expect(401);

    expect(response.body.error).toEqual('Token malformated.');
  });

  it('should not authenticate the user because token is invalid', async () => {
    const response = await request(app)
      .get('/test')
      .set('authentication', `Bearer Fail${generateToken(1)}`)
      .expect(401);

    expect(response.body.error).toEqual('Token invalid.');
  });
});
