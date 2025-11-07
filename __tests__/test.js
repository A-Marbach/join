// __tests__/mini_backend.test.js

test('simple test to check environment', () => {
  window.value = 42;   // window existiert jetzt, jsdom simuliert es
  expect(window.value).toBe(42);
});