const request = require('supertest');
const faker = require('faker');


const { API_URL } = require('../constant');
const { describe } = require('node:test');

describe('/User flow', () => {
  let newUser = {
    name: faker.name.findName(),
    email: faker.internet.email().toLowerCase(),
    password: 'password1',
  };
  let accessToken = '';

  describe('Register/Login Happy Flow', () => {
    test('should return 200 and successfully create new user if data is ok', async () => {
      const res = await request(API_URL)
        .post('/users')
        .send(newUser);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        id: expect.anything(),
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
        lastCheckIn: expect.anything(),
        sentEmailInvite: false,
        status: 'active',
        name: newUser.name,
        email: newUser.email,
      });
    });

    test('should return 200 and log in successfully if data is ok', async () => {
      const checkLoginResponse = await request(API_URL)
        .post('/users/login')
        .send({ email: newUser.email, password: newUser.password });

      accessToken = checkLoginResponse.body.id;
      expect(checkLoginResponse.statusCode).toBe(200);
    });
  });

  describe('Authentication Flow', () => {
    test('should return 422 error if email is already used', async () => {
      const res = await request(API_URL)
        .post('/users')
        .send(newUser);


      expect(res.statusCode).toBe(422);
      expect(res.body.error.name).toBe('ValidationError');
    });

    test('should return 401 error if access token is missing', async () => {
      const res = await request(API_URL).get('/users/checkin');

      expect(res.statusCode).toBe(401);
    });

    test('should return 400 and log in fail if data is incorrect', async () => {
      const checkLoginResponse = await request(API_URL)
        .post('/users/login')
        .send({ email: newUser.email, password: 'wrong password' });

      expect(checkLoginResponse.statusCode).toBe(401);
    });

    test('should return 200 if access token valid', async () => {
      const res = await request(API_URL).get('/users/checkin').set('Authorization', accessToken);

      expect(res.statusCode).toBe(200);
    });
  });

});
