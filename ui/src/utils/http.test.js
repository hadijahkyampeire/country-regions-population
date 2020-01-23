import http from './http';

beforeEach(() => {
  jest.restoreAllMocks();
});

describe('Http tests', () => {
  it('content type application/json passes', async () => {
    const fetch = jest.fn();
    fetch.mockResolvedValue({
      headers: {
        get() {
          return 'application/json';
        }
      },
      json: jest.fn().mockResolvedValue([1, 2, 3, 4]),
      ok: true
    });

    global.fetch = fetch;

    const response = await http.get('/dollars');

    expect(response).toEqual([1, 2, 3, 4]);
  });

  it('different content type fails', done => {
    const fetch = jest.fn();
    fetch.mockResolvedValue({
      headers: {
        get() {
          return 'something-else';
        }
      },
      ok: false
    });
    global.fetch = fetch;

    http.post('/dollars').catch(error => {
      expect(error.message).toEqual('content-type: something-else is not supported');
      done();
    });
  });
});
