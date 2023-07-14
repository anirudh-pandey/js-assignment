const request = require('supertest');
const { app } = require('../../../index');

describe('Get News By TourId', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(done);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should return a 200 OK status code for GET request to /tour/:tourId/news', async () => {
    const response = await request(server).get('/tour/2/news');
    expect(response.status).toBe(200);
  });
});
