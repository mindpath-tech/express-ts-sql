import request from 'supertest';
import nock from 'nock';

describe('index', function () {
  let server: { close: () => void };

  beforeEach(function () {
    server = require('./index');
  });

  afterEach(function () {
    server.close();
  });

  it('checks server health', async () => {
    const res = await request(server).get('/health');
    expect(res.statusCode).toEqual(200);
  });

  it('returns 404 if route not found', async () => {
    const res = await request(server).get('/foo');
    expect(res.statusCode).toEqual(404);
  });

  it('handles error correctly', async () => {
    nock('localhost').get('/health').reply(500, new Error('BOOM'));
    const res = await request(server).get('/health');
    expect(res.statusCode).toEqual(200);
  });
});
