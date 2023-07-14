const request = require('supertest');
const { app } = require('../../../index');

describe('Get News By SportId', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(done);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should return a 200 OK status code for GET request to /sport/:sportId/news', async () => {
    const response = await request(server).get('/sport/1/news');
    expect(response.status).toBe(200);
  });
});