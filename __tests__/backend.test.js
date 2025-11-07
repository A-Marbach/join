// __tests__/backend.test.js

// Minimaler Mock, damit require von mini_backend.js funktioniert
global.window = {};  

const { downloadFromServer, backend } = require('../mini_backend');

describe('Backend module', () => {

  test('downloadFromServer should exist', () => {
    expect(typeof downloadFromServer).toBe('function');
  });

  test('backend.setItem and backend.getItem should work', async () => {
    await backend.setItem('foo', 'bar');
    expect(backend.getItem('foo')).toBe('bar');
  });

  test('backend.deleteItem should remove the key', async () => {
    await backend.setItem('toDelete', 123);
    expect(backend.getItem('toDelete')).toBe(123);
    await backend.deleteItem('toDelete');
    expect(backend.getItem('toDelete')).toBeNull();
  });

  // Optional: einfacher Test für downloadFromServer (nur ob Funktion aufgerufen werden kann)
  test('downloadFromServer can be called', async () => {
    // Wir rufen sie auf, aber nicht gegen echten Server
    const result = downloadFromServer();
    expect(result).toBeInstanceOf(Promise);
  });

});