const request = require('supertest');

const { API_URL } = require('../constant');

describe('Notification routes', () => {
  let accessToken = '';

  describe('Login to get access token', () => {
    test('should return 200 and set access token successfully', async () => {
      const checkLoginResponse = await request(API_URL)
        .post('/users/login')
        .send({ email: 'ninh.uit@gmail.com', password: '123123123' });

      accessToken = checkLoginResponse.body.id;
      expect(checkLoginResponse.statusCode).toBe(200);
    });
  });

  describe('Notification API Test Cases:', () => {
    test('should return 401 and get all notification fail without access token', async () => {
      const res = await request(API_URL)
        .get('/notifications');

      expect(res.statusCode).toBe(401);
    });

    test('should return 200 and get all notifications successfully with access token', async () => {
      const res = await request(API_URL)
        .get('/notifications').set('Authorization', accessToken)

      expect(res.statusCode).toBe(200);
    });
  });
});
