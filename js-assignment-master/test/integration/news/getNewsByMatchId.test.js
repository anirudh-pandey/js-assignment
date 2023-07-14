const request = require('supertest');
const { app } = require('../../../index');

describe('Get News By matchId', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(done);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should return a 200 OK status code for GET request to /match/:matchId/news', async () => {
    const response = await request(server).get('/match/5/news');
    expect(response.status).toBe(200);
  });
});
