const request = require('supertest');
const httpStatus = require('http-status');


const { API_URL } = require('../constant');

describe('Video routes', () => {
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

  describe('Video API Test Cases:', () => {
    test('should return 200 and get all video without access token successfully', async () => {
      const res = await request(API_URL)
        .get('/videos');

      expect(res.statusCode).toBe(200);
    });

    test('should return 401 and can not share a youtube movie without access token', async () => {
      const res = await request(API_URL)
        .post('/videos/shareVideo')
        .send({ videoLink: 'https://www.youtube.com/watch?v=GJVwu1bPWS8' });

      expect(res.statusCode).toBe(401);
    });

    test('should return 404 and share a youtube movie fail if the movie was already shared', async () => {
      const res = await request(API_URL)
        .post('/videos/shareVideo')
        .set('Authorization', accessToken)
        .send({ videoLink: 'https://www.youtube.com/watch?v=_ihFoNhOOm8' });

      expect(res.statusCode).toBe(422);
    });
  });
});
