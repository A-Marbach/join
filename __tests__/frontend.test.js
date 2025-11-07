// __tests__/script.test.js

// Mock backend bevor das script geladen wird
global.backend = {
    getItem: jest.fn(),
    setItem: jest.fn()
};

// Mock downloadFromServer, sonst Fehler bei init/getAllTasks
global.downloadFromServer = jest.fn().mockResolvedValue();

const script = require('../js/script');

describe('filterAllTasks', () => {
    beforeEach(() => {
        // setze die Variablen im script-Modul selbst
        script.users = [
            { tasks: [
                { id: 1, list: 'todo' },
                { id: 2, list: 'progress' },
                { id: 3, list: 'feedback' },
                { id: 4, list: 'done' },
                { id: 5, list: 'todo' },
            ]}
        ];
        script.activeUser = 0;

        // leere Arrays für jede Kategorie
        script.todo = [];
        script.progress = [];
        script.feedback = [];
        script.done = [];
    });

    test('correctly separates tasks into categories', async () => {
        await script.filterAllTasks();
        expect(script.todo.length).toBe(2);
        expect(script.progress.length).toBe(1);
        expect(script.feedback.length).toBe(1);
        expect(script.done.length).toBe(1);
    });
});
