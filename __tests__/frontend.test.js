/**
 * __tests__/frontend.test.js
 */
const { addTask } = require('../js/board');

describe('Frontend DOM tests', () => {
    beforeEach(() => {
        document.body.innerHTML = '<ul id="tasks"></ul><button id="addBtn">Add</button>';
    });

    test('addTask adds a new li to the ul', () => {
        addTask('My Task');
        const ul = document.getElementById('tasks');
        expect(ul.children.length).toBe(1);
        expect(ul.children[0].textContent).toBe('My Task');
    });

    test('button click adds task', () => {
        const btn = document.getElementById('addBtn');
        btn.addEventListener('click', () => addTask('Clicked Task'));

        btn.click();

        const ul = document.getElementById('tasks');
        expect(ul.children[0].textContent).toBe('Clicked Task');
    });
});
