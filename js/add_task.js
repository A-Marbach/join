let allCategorys = [];
let assignedChackedBoxes = [];
let colorArray = [];
let allSubtaskss = [];
let selectedSubtaskss = [];
let selectedSubtasksForProgreses = [];
let selectedSubtasksProgress = [];
let allLiCategorys;
let currentCategoryColor;
let currentIndex = 0;
let newCategorySelected = false;
let categoryIsOpen = false;
let contactsIsOpen = false;
var currentDate = new Date();
/**
 * create task and send  to board.html site
 * 
 * 
 * @param {string} event - to stop load the site new
 */
function onSubmits(event) {
    event.preventDefault();
    addTasks();
    setTimeout(() => {
        window.location.href = 'board.html';
    }, "1500");
}
/**
 * load all first functions for show the site
 * 
 * 
 */
async function initLoadTasksAddTask() {
    await includeHTML();
    await getAllTasks();
    openAllContactss();
    createnewCategoryAlls();
    loadActiveUsers();
    navBarHighlight(3);
    document.getElementById("dueDates").setAttribute("min", currentDate.toISOString().split('T')[0]);
}
/**
 * open the notive container
 * 
 * 
 */
function notice() {
    document.getElementById('mainContents').classList.add('d-none');
    document.getElementById('legalNiticeAddTask').classList.remove('d-none');
    document.getElementById('dataProtection').classList.add('d-none');
    document.getElementById('help').classList.add('d-none');
}
/**
 * back to maincontainer after notice
 * 
 * 
 */
function goBacktoMainContainers() {
    document.getElementById('mainContents').classList.remove('d-none');
    document.getElementById('legalNiticeAddTask').classList.add('d-none');
}
/**
 * open the help container
 * 
 * 
 */
function help() {
    document.getElementById('help').classList.remove('d-none');
    document.getElementById('mainContents').classList.add('d-none');
    document.getElementById('dataProtection').classList.add('d-none');
    document.getElementById('legalNiticeAddTask').classList.add('d-none');
}
/**
 * close the help container
 * 
 * 
 */
function goBacktoMainContainer() {
    document.getElementById('help').classList.add('d-none');
    document.getElementById('mainContents').classList.remove('d-none');
}
/**
 * open the data Protection container
 * 
 * 
 */
function dataProtection() {
    document.getElementById('mainContents').classList.add('d-none');
    document.getElementById('dataProtection').classList.remove('d-none');
    document.getElementById('legalNiticeAddTask').classList.add('d-none');
    document.getElementById('help').classList.add('d-none');
}
/**
 * close the data Protection container
 * 
 * 
 */
function goBack() {
    document.getElementById('mainContents').classList.remove('d-none');
    document.getElementById('dataProtection').classList.add('d-none');
}
/**
 * show the log out button
 * 
 * 
 */
function showLogOutButton() {
    document.getElementById('logOutButton').classList.remove('d-none');
    document.getElementById('logOutBackground').classList.remove('d-none');

}
/**
 * hiden the log out button
 * 
 * 
 */
function hideLogOutButton() {
    document.getElementById('logOutButton').classList.add('d-none');
    document.getElementById('logOutBackground').classList.add('d-none');
}
/**
 * log out function
 * 
 * 
 */
async function logOut() {
    await backend.deleteItem('activeUser');
    await backend.deleteItem('letters');
    window.location.href = 'index.html';
}
/**getAllTasks
 * create a message when the category array is empty
 * 
 * 
 * @param {string} task - created task 
 *  
 */
function addInfoToTakeCategory(task) {
    if (!task.category || task.category.length === 0) {
        let errorContainer = document.getElementById('div');
        errorContainer.classList.remove('d-none');
        errorContainer.innerHTML = 'Bitte wählen Sie eine Kategorie aus.';
        errorContainer.style.display = 'block';
        setTimeout(function () {
            errorContainer.style.display = 'none';
        }, 1000);
        return;
    }
    return true;
}
/**
 * create a message when the assigned to array is empty
 * 
 * 
 * @param {string} task - created task 
 *  
 */
function addInfoToTakeAssignedTo(task) {
    if (!task.assignedTo || task.assignedTo.length === 0) {
        let errorContainer = document.getElementById('div');
        errorContainer.classList.remove('d-none');
        errorContainer.innerHTML = 'Bitte wählen Sie die Verantwortlichen.';
        errorContainer.style.display = 'block';
        setTimeout(function () {
            errorContainer.style.display = 'none';
        }, 1000);
        return;
    }
    return true;
}
/**
 * create a message when the prio array is empty
 * 
 * 
 * @param {string} task - created task  
 * 
 */
function addInfoToTakePrio(task) {
    if (!task.prio || task.prio.length === 0) {
        let errorContainer = document.getElementById('div');
        errorContainer.classList.remove('d-none');
        errorContainer.innerHTML = 'Bitte wählen Sie eine Priorität.';
        errorContainer.style.display = 'block';
        setTimeout(function () {
            errorContainer.style.display = 'none';
        }, 1000);
        return;
    }
    return true;
}
/**
 * create a message when create an task is done
 * 
 * 
 */
function addInfoToTakeAnTask() {
    let successContainer = document.getElementById('div');
    successContainer.classList.remove('d-none');
    successContainer.innerHTML = 'Task wurde erfolgreich erstellt.';
    successContainer.style.display = 'block';
    setTimeout(function () {
        successContainer.style.display = 'none';
    }, 1000);

}
/**
 * return the information in create an task for message
 * 
 * 
 * @param {string} task - created task
 * 
 */
function validateTask(task) {
    if (!addInfoToTakeCategory(task)) {
        return false;
    }
    if (!addInfoToTakeAssignedTo(task)) {
        return false;
    }
    if (!addInfoToTakePrio(task)) {
        return false;
    }
    return true;
}
/**
 * preparing to create a task
 * 
 * 
 */
async function addTasks() {
    let title = document.getElementById('titles').value;
    let description = document.getElementById('descriptions').value;
    let dueDate = document.getElementById('dueDates').value;
    let task = {
        'title': title,
        'description': description,
        'category': allLiCategorys,
        'dueDates': dueDate,
        'assignedTo': assignedChackedBoxes,
        'prio': colorArray,
        'subtask': selectedSubtaskss,
        'subtaskChecked': selectedSubtasksForProgreses,
        'id': new Date().getTime(),
        'list': 'todo',
    };
    if (!validateTask(task)) {
        return;
    }
    users[activeUser]['tasks'].push(task);
    await backend.setItem('users', JSON.stringify(users));
    addInfoToTakeAnTask();
    inputfieldsValues();
}
/**
 * load the active user
 * 
 * 
 */
function loadActiveUsers() {
    let activeUsers = document.getElementById('headerContents');
    activeUsers.innerHTML = '';
    const name = users[activeUser]['initials'];
    const color = users[activeUser]['color'];
    activeUsers.innerHTML = loadActiveUsersHTML(name, color);
}
/**
 * reset all inputfield after create an task 
 * 
 * 
 */
function inputfieldsValues() {
    document.getElementById('titles').value = '';
    document.getElementById('descriptions').value = '';
    document.getElementById('dueDates').value = '';
    document.getElementById('addTask_assignedAddContact').innerHTML = '';
    resetCheckboxes();
    resetSettingsCategorys();
    resetSettingsChangeColors();
    resetSubtaskss();
}