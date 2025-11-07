// __tests__/backend.test.js
global.window = {};  // minimal mock, damit require funktioniert
const { downloadFromServer, backend } = require('../mini_backend');

describe('Backend tests', () => {
  test('downloadFromServer exists', () => {
    expect(typeof downloadFromServer).toBe('function');
  });

  test('setItem/getItem works', async () => {
    await backend.setItem('foo', 'bar');
    expect(backend.getItem('foo')).toBe('bar');
  });
});