/**
 * open the help container
 * 
 * 
 */
function helpp() {
    document.getElementById('helpp').classList.remove('d-none');
    document.getElementById('mainContent').classList.add('d-none');
    document.getElementById('bigLogOutButton').classList.add('d-none');
    document.getElementById('dataProtection').classList.add('d-none');
    document.getElementById('legalNiticeBord').classList.add('d-none');
}
/**
 * open the data protection container
 * 
 * 
 */
function dataProtection() {
    document.getElementById('dataProtection').classList.remove('d-none');
    document.getElementById('mainContent').classList.add('d-none');
    document.getElementById('bigLogOutButton').classList.add('d-none');
    document.getElementById('legalNiticeBord').classList.add('d-none');
    document.getElementById('helpp').classList.add('d-none');
}
/**
 * go back to maincontainer 
 * 
 * 
 */
function goBack() {
    document.getElementById('dataProtection').classList.add('d-none');
    document.getElementById('mainContent').classList.remove('d-none');
}
/**
 * open the notice container
 * 
 * 
 */
function notice() {
    document.getElementById('mainContent').classList.add('d-none');
    document.getElementById('legalNiticeBord').classList.remove('d-none');
    document.getElementById('bigLogOutButton').classList.add('d-none');
    document.getElementById('helpp').classList.add('d-none');
    document.getElementById('dataProtection').classList.add('d-none');
}
/**
 * show the log out button
 * 
 * 
 */
function showLogOutButtonBord() {
    document.getElementById('bigLogOutButton').classList.remove('d-none');
    document.getElementById('logOutBackground').classList.remove('d-none');
}
/**
 * lose the log out button
 * 
 * 
 */
function hideLogOutButtonBord() {
    document.getElementById('bigLogOutButton').classList.add('d-none');
    document.getElementById('logOutBackground').classList.add('d-none');

}
/**
 * close the global container after log out
 * 
 * 
 */
function goBacktoMainContainers() {
    document.getElementById('helpp').classList.add('d-none');
    document.getElementById('mainContent').classList.remove('d-none');
    document.getElementById('legalNiticeBord').classList.add('d-none');
}
/**
 * filter the tasks 
 * 
 * 
 */
function filterTasksForCreate() {
    let todos = users[activeUser]['tasks'].filter(t => t['list'] == 'todo');
    let progress = users[activeUser]['tasks'].filter(t => t['list'] == 'progress');
    let feedbacks = users[activeUser]['tasks'].filter(t => t['list'] == 'feedback');
    let dones = users[activeUser]['tasks'].filter(t => t['list'] == 'done');
    return { todos, progress, feedbacks, dones };
}
/**
 * get container for tasks
 * 
 * 
 */
function getTaskContainers() {
    let containerTodo = document.getElementById('containerTodos');
    let containerProgress = document.getElementById('containerProgresses');
    let containerFeedback = document.getElementById('containerFeedbacks');
    let containerDone = document.getElementById('containerDones');
    containerTodo.innerHTML = '';
    containerProgress.innerHTML = '';
    containerFeedback.innerHTML = '';
    containerDone.innerHTML = '';
    return { containerTodo, containerProgress, containerFeedback, containerDone };
}
/**
 * add the task to Todo container
 * 
 * 
 * @param {string} container - the container Todo
 * @param {string} tasks - a task that needs to be done
 */
function addTasksToContainerTodo(container, tasks) {
    if (tasks.length < 1) {
        container.innerHTML = '<div class="noTaskWithBorder">No Task in Todo</div>';
    }
    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i];
        let initialsContainer = createTaskAssignedTo(element);
        let subtaskInitialsContainer = createTaskProgressbar(element, i);
        container.innerHTML += createTaskHTML(initialsContainer, subtaskInitialsContainer, element);
    }
}
/**
 * add the task to Progress container
 * 
 * 
 * @param {string} container - the container progress
 * @param {string} tasks - a task that needs to be done
 */
function addTasksToContainerProgress(container, tasks) {
    if (tasks.length < 1) {
        container.innerHTML = '<div class="noTaskWithBorder">No Task in Progress</div>';
    }
    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i];
        let initialsContainer = createTaskAssignedTo(element);
        let subtaskInitialsContainer = createTaskProgressbar(element, i);
        container.innerHTML += createTaskHTML(initialsContainer, subtaskInitialsContainer, element);
    }
}
/**
 * add the task to Feedback container
 * 
 * 
 * @param {string} container - the container feedback
 * @param {string} tasks - a task that needs to be done
 */
function addTasksToContainerFeedback(container, tasks) {
    if (tasks.length < 1) {
        container.innerHTML = '<div class="noTaskWithBorder">No Task in Feedback</div>';
    }
    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i];
        let initialsContainer = createTaskAssignedTo(element);
        let subtaskInitialsContainer = createTaskProgressbar(element, i);
        container.innerHTML += createTaskHTML(initialsContainer, subtaskInitialsContainer, element);
    }
}
/**
 * add the task to Done container
 * 
 * 
 * @param {string} container - the container done 
 * @param {string} tasks - a task that needs to be done
 */
function addTasksToContainerDone(container, tasks) {
    if (tasks.length < 1) {
        container.innerHTML = '<div class="noTaskWithBorder">No Task in Done</div>';
    }
    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i];
        let initialsContainer = createTaskAssignedTo(element);
        let subtaskInitialsContainer = createTaskProgressbar(element, i);
        container.innerHTML += createTaskHTML(initialsContainer, subtaskInitialsContainer, element);
    }
}