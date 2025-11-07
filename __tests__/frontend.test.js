const { createTaskAssignedTo, createTaskProgressbar } = require('../js/board');

describe('Frontend logic functions (mock DOM)', () => {
  beforeAll(() => {
    // Minimaler DOM-Mock, nur damit innerHTML existiert
    global.document = {
      createElement: (tag) => ({ tagName: tag.toUpperCase(), innerHTML: '' }),
    };
  });

  test('createTaskAssignedTo returns HTML string', () => {
    const element = {
      assignedTo: [
        { name: 'Max Mustermann', color: 'red' },
        { name: 'Anna Schmidt', color: 'blue' },
      ],
    };
    const result = createTaskAssignedTo(element);
    expect(result).toContain('Max');
    expect(result).toContain('Anna');
  });

  test('createTaskProgressbar returns HTML string with correct percentage', () => {
    const element = {
      subtask: ['a', 'b', 'c'],
      subtaskChecked: ['a', 'b'],
    };
    const result = createTaskProgressbar(element, 0);
    expect(result).toContain('66'); // 2/3 = 66%
  });
});