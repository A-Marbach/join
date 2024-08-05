let allCategorys = [];
let allSubtasks = [];
let allContacts = [];
let assignedChackedBox = [];
let selectedSubtasksForProgress = [];
let selectedSubtasksProgress = [];
let selectedSubtasks = [];
let searchTodos = [];
let searchProgress = [];
let searchFeedback = [];
let searchDone = [];
let allLiCategory;
let currentSelectedCategory;
let currentDraggedElement;
let currentCategoryColor;
let currentList;
let newCategorySelected = false;
let currentIndex = 0;
let currentId = 0;
let timer;
let timeIsup = false;
let touchStartActive = false;
var currentDate = new Date();
/**
 * load all first functions for show the site
 * 
 * 
 */
async function initLoadTasks() {
    await includeHTML();
    await getAllTasks();
    openAllContacts();
    loadActiveUser();
    filterAllTasks();
    filterTasks();
    navBarHighlight(2);
}
/**
 * main filter function of tasks after load the site new
 * 
 * 
 */
function filterTasks() {
    filterTodo();
    filterFeedback();
    filterInprogress();
    filterDone();
}
/**
 * load the activeuser information 
 * 
 * 
 */
function loadActiveUser() {
    let activeUsers = document.getElementById('headerContent');
    activeUsers.innerHTML = '';
    const name = users[activeUser]['initials'];
    const color = users[activeUser]['color'];
    activeUsers.innerHTML = loadActiveUserHTML(name, color);
}
/**
 * log out
 * 
 * 
 */
async function logOut() {
    await backend.deleteItem('activeUser');
    await backend.deleteItem('letters');
    window.location.href = 'index.html';
}
/**
 *  create the information for assigned To in the task
 * 
 * 
 * @param {string} element - the contacts they are work in the task
 * 
 */
function createTaskAssignedTo(element) {
    let nameParts = element['assignedTo'];
    let initialsContainer = '';
    for (let j = 0; j < nameParts.length; j++) {
        if (j < 2) {
            let name = nameParts[j]['name'].split(' ');
            let color = nameParts[j]['color'];
            let initials = name[0][0].toUpperCase();
            if (name.length > 1) {
                initials += name[1][0].toUpperCase();
            }
            initialsContainer += createTaskAssignedToHTML(color, initials);
        } else {
            initialsContainer += /*html*/ `
          <div class="nameContainer">+${nameParts.length - 3}</div>`;
            break;
        }
    }
    return initialsContainer;
}
/**
 * show the progressbar in the task of subtasks
 * 
 * 
 * @param {string} element - this are the subtasks
 * @param {*number} i - the id for the selected subtask
 * @returns 
 */
function createTaskProgressbar(element, i) {
    let allSubtasks = element['subtask'];
    let currentSubtask = element['subtaskChecked'];
    let progresses = `${currentSubtask.length}/${allSubtasks.length} Done`;
    let procent = currentSubtask.length / allSubtasks.length;
    procent = Math.round(procent * 100);
    let subtaskInitialsContainer = '';
    if (allSubtasks.length > 0) {
        subtaskInitialsContainer += createTaskProgressbarHTML(progresses, procent, i);
    }
    return subtaskInitialsContainer;
}
/**
 * filter the tasks for todo after load the site new
 * 
 * 
 */
function filterTodo() {
    let renderTodo = document.getElementById('containerTodos');
    if(todo.length <1){
    renderTodo.innerHTML = '<div class="noTaskWithBorder">No Task in Todo</div>';
}else {
    renderTodo.innerHTML = '';
}
    for (let i = 0; i < todo.length; i++) {
        const element = todo[i];
        let initialsContainer = createTaskAssignedTo(element);
        let subtaskInitialsContainer = createTaskProgressbar(element, i);

        renderTodo.innerHTML += createTaskHTML(initialsContainer, subtaskInitialsContainer, element);
    }
}
/**
 * filter the tasks for progress after load the site new
 * 
 * 
 */
function filterInprogress() {
    let renderProgress = document.getElementById('containerProgresses');
    if(progress.length <1){
        renderProgress.innerHTML = '<div class="noTaskWithBorder">No Task in Progress</div>';
    }else {
        renderProgress.innerHTML = '';
    }
    for (let i = 0; i < progress.length; i++) {
        const element = progress[i];
        let initialsContainer = createTaskAssignedTo(element)
        let subtaskInitialsContainer = createTaskProgressbar(element, i)
        renderProgress.innerHTML += createTaskHTML(initialsContainer, subtaskInitialsContainer, element)
    }
}
/**
 * filter the tasks for feedback after load the site new
 * 
 * 
 */
function filterFeedback() {
    let renderFeedback = document.getElementById('containerFeedbacks');
    if(feedback.length <1){
        renderFeedback.innerHTML = '<div class="noTaskWithBorder">No Task in Feedback</div>';
    }else {
        renderFeedback.innerHTML = '';
    }
    for (let i = 0; i < feedback.length; i++) {
        const element = feedback[i];
        let initialsContainer = createTaskAssignedTo(element)
        let subtaskInitialsContainer = createTaskProgressbar(element, i)
        renderFeedback.innerHTML += createTaskHTML(initialsContainer, subtaskInitialsContainer, element)
    }
}
/**
 * filter the tasks for done after load the site new
 * 
 * 
 */
function filterDone() {
    let renderDone = document.getElementById('containerDones');
    if(done.length <1){
        renderDone.innerHTML = '<div class="noTaskWithBorder">No Task in Done</div>';
    }else {
        renderDone.innerHTML = '';
    }
    for (let i = 0; i < done.length; i++) {
        const element = done[i];
        let initialsContainer = createTaskAssignedTo(element)
        let subtaskInitialsContainer = createTaskProgressbar(element, i)
        renderDone.innerHTML += createTaskHTML(initialsContainer, subtaskInitialsContainer, element)
    }
}
/**
 * the container for create an task 
 * 
 * 
 * @param {string} list container list to create an task
 */
function addTaskRight(list) {
    document.getElementById('addTaskRight').classList.remove('d-none');
    document.getElementById("dueDate").setAttribute("min", currentDate.toISOString().split('T')[0]);
    currentList = list;
}
/**
 * close the task container after create an task
 * 
 * 
 */
async function closeContainer1() {
    document.getElementById('closeContainer2').classList.add('d-none');
    selectedSubtasksProgress = [];
    // await backend.setItem('allTasks', JSON.stringify(allTasks));
    await backend.setItem('users', JSON.stringify(users));
}
document.addEventListener('DOMContentLoaded', function() {
    const closeContainer2 = document.getElementById('closeContainer2');
    const checkTaskSmall = document.getElementById('checkTaskSmall');
    const toEditTaskMainDiv = document.getElementById('toEditTaskMainDiv');

    if (checkTaskSmall) {
        // Füge einen Event-Listener hinzu, um die Ereignisweiterleitung zu stoppen
        checkTaskSmall.addEventListener('click', function(event) {
            event.stopPropagation();
        });
        toEditTaskMainDiv.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }
    if (closeContainer2) {
        closeContainer2.addEventListener('click', function() {
            closeContainer2.classList.add('d-none');
        });
    } else {
        console.error('Element mit ID "closeContainer2" wurde nicht gefunden.');
    }
});

/**
 * close the task container after to edit the task
 * 
 * 
 */
function closeContainer() {
    document.getElementById('addTaskRight').classList.add('d-none');
    inputfieldValue();
}
/**
 * onclick function at html site 
 * 
 * 
 * @param {string} event - to stop load the site new
 */
function onSubmit(event) {
    event.preventDefault();
    createTask();
}
/**
 * create a message when the category array is empty
 * 
 * 
 * @param {string} task task from user
 * @returns 
 */
function addInfoToTakeCategory(task) {
    if (!task.category || task.category.length === 0) {
        let errorContainer = document.getElementById('taskDiv1');
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
 * @param {string} task task from user
 * 
 */
function addInfoToTakeAssignedTo(task) {
    if (!task.assignedTo || task.assignedTo.length === 0) {
        let errorContainer = document.getElementById('taskDiv1');
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
 * @param {string} task - task from user
 * 
 */
function addInfoToTakePrio(task) {
    if (!task.prio || task.prio.length === 0) {
        let errorContainer = document.getElementById('taskDiv1');
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
 * create a massege when create an task is done
 * 
 * 
 */
function addInfoToTakeAnTask() {
    let successContainer = document.getElementById('taskDiv');
    successContainer.classList.remove('d-none');
    successContainer.innerHTML = 'Task wurde erfolgreich erstellt.';
    successContainer.style.display = 'block';
    setTimeout(function () {
        successContainer.style.display = 'none';
    }, 1000);

}
/**
 * return the information in create an task for massege
 * 
 * 
 * @param {string} task - task
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
async function createTask() {
    let titles = document.getElementById('title').value;
    let descriptions = document.getElementById('description').value;
    let dueDates = document.getElementById('dueDate').value;
    let task = {
        'title': titles,
        'description': descriptions,
        'category': allLiCategory,
        'dueDates': dueDates,
        'assignedTo': assignedChackedBox,
        'prio': colorArray,
        'subtask': selectedSubtasks,
        'subtaskChecked': selectedSubtasksForProgress,
        'id': new Date().getTime(),
        'list': currentList,
    };
    if (!validateTask(task)) {
        return;
    }
    users[activeUser]['tasks'].push(task);
    addTasking();
    inputfieldValue();
    addInfoToTakeAnTask();
    closeContainer();
}
/**
 * create an task
 * 
 * 
 */
async function addTasking() {
    const { todos, progress, feedbacks, dones } = filterTasksForCreate();
    const { containerTodo, containerProgress, containerFeedback, containerDone } = getTaskContainers();
    addTasksToContainerTodo(containerTodo, todos);
    addTasksToContainerProgress(containerProgress, progress);
    addTasksToContainerFeedback(containerFeedback, feedbacks);
    addTasksToContainerDone(containerDone, dones);
    // await backend.setItem('allTasks', JSON.stringify(allTasks));
    await backend.setItem('users', JSON.stringify(users));
}
/**
 * checks how long task is touched on mobile
 * 
 * 
 * @param {number} id - the id for mobile display touched 
 */
function touchstart(id) {
    timer = setTimeout(() => onlongtouch(id), 200);
}
/**
 * checks if touch on mobile has ended
 * 
 * 
 * @param {number} id - the id for mobile display touched 
 */
function touchend(id) {
    if (timer && !timeIsup) {
        clearTimeout(timer);
        openCheckTask(id);
    }
    setTimeout(() => timeIsup = false, 250)
}
/**
 * action that is performed if mobile display is touched long enough
 * 
 * 
 * @param {number} id - the id for mobile display touched 
 */
function onlongtouch(id) {
    timeIsup = true;
    openMoveToPoppupMobile(id);
}
/**
 * opens container that allows shifting tasks between states on mobile devices
 * 
 * 
 * @param {number} id - the id from the container
 */
function openMoveToPoppupMobile(id) {
    touchStartActive = true;
    let task = document.getElementById('containerBlock-' + id);
    currentDraggedElement = id;
    task.innerHTML += openMoveToPoppupMobileHTML();
}
/**
 * to stop the onclick
 * 
 * 
 * @param {string} event - event to stop propagation popup
 */
function save(event) {
    event.stopPropagation();

}
/**
 *  filters board after performing a change in status on mobile devices
 * 
 * 
 */
function closeMoveToPoppupMobile() {
    filterTasks();
}
/**
 * add the backgroundarea from task
 * 
 * 
 * @param {number} id - id for the backgroundarea
 */
function highlight(id) {
    document.getElementById(id).classList.add('dragAreaHighlight');
}
/**
 * remove the backgroundarea from task
 * 
 * 
 * @param {number} id - id from html element for the backgroundarea
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove('dragAreaHighlight');
}
/**
 * allow Drop funktion for the task
 * 
 * 
 * @param {string} ev - allow to drap function
 */
function allowDrop(ev) {
    ev.preventDefault();
}
/**
 * drop funktion to filter the task 
 * 
 * @param {string} categorys - the category to drop and drag the tasks
 */
async function drop(categorys) {
    let droppedTask = users[activeUser]['tasks'].filter(x => x.id == currentDraggedElement)
    droppedTask[0]['list'] = categorys;
    filterTasks();
    filterAllTasks();
    addTasking();
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    await backend.setItem('users', JSON.stringify(users));
    setTimeout(function () {
        touchStartActive = false;
    }, 1000);
}
/**
 *  create an variable for id
 * 
 * 
 * @param {number} id - variable id for drag
 */
function drag(id) {
    currentDraggedElement = id;
}
/**
 * reset the fields by create an task  
 * 
 * 
 */
function inputfieldValue() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('dueDate').value = '';
    document.getElementById('assignedAddContact').innerHTML = '';
    resetCheckbox();
    resetSettingsCategory();
    resetSettingsChangeColor();
    resetSubtasks();
    colorArray = [];
    allLiCategory = [];
}