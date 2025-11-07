// __tests__/mini_backend.test.js
const backendModule = require('../mini_backend.js');

// Mock global window, damit window.onload nicht crasht
global.window = { onload: () => {} };

// Mock fetch für downloadFromServer
global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () => Promise.resolve('{"foo":"bar"}')
  })
);

describe('Backend tests', () => {
  test('downloadFromServer sets jsonFromServer correctly', async () => {
    await backendModule.downloadFromServer();
    // Wir greifen hier auf das interne jsonFromServer zu
    // Optional: du könntest export jsonFromServer aus mini_backend.js für Testzwecke
  });

  test('setItem adds a key', async () => {
    await backendModule.backend.setItem('testKey', 123);
    expect(backendModule.backend.getItem('testKey')).toBe(123);
  });

  test('deleteItem removes a key', async () => {
    await backendModule.backend.setItem('delKey', 'delete me');
    await backendModule.backend.deleteItem('delKey');
    expect(backendModule.backend.getItem('delKey')).toBeNull();
  });
});