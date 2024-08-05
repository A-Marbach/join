/**
 * this function load all funktions for summary site
 * 
 * 
 */
async function initSummary() {
    await includeHTML();
    await getAllTasks();
    filterAllTasks();
    watchTask();
    loadActiveUsers();
    navBarHighlight(1);
}
/*
 * open the info container
 * 
 * 
 */
function helpSummary() {
    document.getElementById('mainContainer').classList.add('d-none');
    document.getElementById('help').classList.remove('d-none');
    document.getElementById('logOutBackground').classList.add('d-none');
    document.getElementById('dataProtection').classList.add('d-none');
    document.getElementById('legalNiticeSummery').classList.add('d-none');
}
/*
 *open the notice container
 * 
 * 
 */
function notice() {
    document.getElementById('mainContainer').classList.add('d-none');
    document.getElementById('legalNiticeSummery').classList.remove('d-none');
    document.getElementById('logOutBackground').classList.add('d-none');
    document.getElementById('help').classList.add('d-none');
    document.getElementById('dataProtection').classList.add('d-none');
}
/**
 * open the data Protection container
 * 
 * 
 */
function dataProtection() {
    document.getElementById('mainContainer').classList.add('d-none');
    document.getElementById('dataProtection').classList.remove('d-none');
    document.getElementById('logOutButtonSummary').classList.add('d-none');
    document.getElementById('help').classList.add('d-none');
    document.getElementById('legalNiticeSummery').classList.add('d-none');
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
/**
 * close the data Protection container
 * 
 * 
 */
function goBack() {
    document.getElementById('dataProtection').classList.add('d-none');
    document.getElementById('mainContainer').classList.remove('d-none');
}
/**
 * close the info and data Protection container
 * 
 * 
 */
function goBacktoMainContainer() {
    document.getElementById('mainContainer').classList.remove('d-none');
    document.getElementById('help').classList.add('d-none');
    document.getElementById('legalNiticeSummery').classList.add('d-none');
}
/**
 * open the log out button
 * 
 * 
 */
function showLogOutButtonSummary() {
    document.getElementById('logOutButtonSummary').classList.remove('d-none');
    document.getElementById('logOutBackground').classList.remove('d-none');
}
/**
 * close the log out button
 * 
 * 
 */
function hideLogOutButtonSummary() {
    document.getElementById('logOutButtonSummary').classList.add('d-none');
    document.getElementById('logOutBackground').classList.add('d-none');
}
/**
 * show the white pencel then touch the button by black background
 * 
 * 
 */
function onHoverLeft() {
    document.getElementById('left-img').src = './asseds/img/stift-weiss.png';
}
/**
 * show the black pencel then touch the button by white background
 * 
 * 
 */
function offHoverLeft() {
    document.getElementById('left-img').src = './asseds/img/Frame 59.png';
}
/**
 * show the white checkmark then touch the button by black background
 * 
 * 
 */
function onHoverRight() {
    document.getElementById('right-img').src = './asseds/img/hacken-weiss.png';

}
/**
 * show the black checkmark then touch the button by white background
 * 
 * 
 */
function offHoverRight() {
    document.getElementById('right-img').src = './asseds/img/Group 7 (1).png';
}
/**
 * load the active user at summary
 * 
 * 
 */
function loadActiveUsers() {
    let activeUsers = document.getElementById('headerContents');
    activeUsers.innerHTML = '';
    const name = users[activeUser]['initials'];
    const color = users[activeUser]['color'];
    activeUsers.innerHTML = loadActiveUsersSummaryHTML(name, color);
    greet();
}
/**
 * manages and displays tasks
 * 
 * 
 */
function watchTask() {
    let watchUrgent = document.getElementById('task-urgent');
    let watchBoard = document.getElementById('task-board');
    let watchTodo = document.getElementById('task-todo');
    let watchDone = document.getElementById('task-done');
    let watchProgress = document.getElementById('task-progress');
    let watchFeedback = document.getElementById('task-feedback');
    let watchDate = document.getElementById('task-date');
    clearDivs(watchUrgent, watchBoard, watchTodo, watchDone, watchProgress, watchFeedback, watchDate);
    watchtasksLength(watchUrgent, watchBoard, watchTodo, watchDone, watchProgress, watchFeedback, watchDate);
}
/**
 * clears HTML element content
 * 
 * @param {string} watchUrgent id from watch urgent container
 * @param {string} watchBoard id from watch board container
 * @param {string} watchTodo id from watch todo container
 * @param {string} watchDone id from watch done container
 * @param {string} watchProgress id from watch progress container
 * @param {string} watchFeedback id from watch feedback container
 * @param {string} watchDate id from watch date container
 */
function clearDivs(watchUrgent, watchBoard, watchTodo, watchDone, watchProgress, watchFeedback, watchDate) {
    watchUrgent.innerHTML = '';
    watchTodo.innerHTML = '';
    watchDone.innerHTML = '';
    watchBoard.innerHTML = '';
    watchProgress.innerHTML = '';
    watchFeedback.innerHTML = '';
    watchDate.innerHTML = '';
}
/**
 * displays task-related information
 * 
 * @param {number} watchUrgent the number of urgent tasks
 * @param {number} watchBoard the number of board tasks
 * @param {number} watchTodo the number of todo tasks
 * @param {number} watchDone the number of done tasks
 * @param {number} watchProgress the number of progess tasks
 * @param {number} watchFeedback the number of feedback tasks
 * @param {number} watchDate the number of latest urgend tasks
 */
function watchtasksLength(watchUrgent, watchBoard, watchTodo, watchDone, watchProgress, watchFeedback, watchDate) {
    let countUrgent = showUrgent()
    let earliestDueDate = deudate()
    watchUrgent.innerHTML += `<b>${countUrgent}</b>`;
    watchBoard.innerHTML += `<b>${users[activeUser]['tasks'].length}</b>`;
    watchProgress.innerHTML += `<b>${progress.length}</b>`;
    watchFeedback.innerHTML += `<b>${feedback.length}</b>`;
    watchTodo.innerHTML += `<b>${todo.length}</b>`;
    watchDone.innerHTML += `<b>${done.length}</b>`;
    watchDate.innerHTML += `<b>${earliestDueDate ? earliestDueDate.toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}</b>`;
}
/**
 * returns the earliest due date of a user's tasks
 * 
 * @returns of null if the is no task in board
 */
function deudate() {
    if (users[activeUser]['tasks'].length === 0) {
        return null;
    }
    let earliestDueDate;
    for (let i = 0; i < users[activeUser]['tasks'].length; i++) {
        if (users[activeUser]['tasks'][i]['prio']['color'] == ['red']) {
            let currentDueDate = new Date(users[activeUser]['tasks'][i].dueDates);
            if (currentDueDate < earliestDueDate || earliestDueDate === undefined) {
                earliestDueDate = currentDueDate;
            }
        }
    }
    return earliestDueDate;
}
/**
 * show the mount of urgent tasks
 * 
 * @returns the mount of urgent tasks
 * 
 */
function showUrgent() {
    let countUrgent = 0;
    for (let i = 0; i < users[activeUser]['tasks'].length; i++) {
        if (users[activeUser]['tasks'][i].prio.text === 'Urgent') {
            countUrgent++;
        }
    }
    return countUrgent;
}
/**
 * displays a greeting message based on the current time of day
 * 
 * 
 */
function greet() {
    let greet = document.getElementById('greetTime');
    greet.innerHTML = '';
    let today = new Date()
    let curHr = today.getHours()
    if (curHr < 12) {
        greet.innerHTML = `good morning<br><p>${users[activeUser]['name']}</p>`;
    } else if (curHr < 18) {
        greet.innerHTML = `good afternoon<br><p>${users[activeUser]['name']}</p>`;
    } else {
        greet.innerHTML = `good evening<br><p>${users[activeUser]['name']}</p>`;
    }
}