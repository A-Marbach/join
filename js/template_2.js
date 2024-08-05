
/**
 * load the html date for show the activeuser, help information and log aut button
 * 
 * 
 * @param {string} name name from user
 * @param {string} color backgroundcolor from user
 * @returns html from active user
 */
function loadActiveUserHTML(name, color) {
    return /*html*/ `
        <img class="headerImageLeft" src="./asseds/img/biglogo.png">
        <p>Kanban Project Management Tool</p>
    
        <div class="headerContentRight">
            <img onclick="helpp()" class="information" src="./asseds/img/information.png">
            <div id="userButton" onclick="showLogOutButtonBord()" class="personLogIn" style="background-color: ${color}">
                ${name}
            </div>
            
            <div id="bigLogOutButton" class="bigLogOutButton d-none">
                <div id="helpBord" class="helpBord d-none" onclick="helpp()">Help</div>
                <div id="legalNotice" class="legalNotice d-none" onclick="notice()" >Legal Notice</div>
                <div class="dataProtectionBord d-none" id="dataProtectionLogOutButton" onclick="dataProtection()">Datenschutz</div>
                <div class="LogOutBort" id="logOutButton" onclick="logOut()">Log Out</div>
            </div>

        </div>
    `;
}
/**
 * html code for create a new category
 * 
 * @param {string} element the name of the category 
 * @param {number} i number to find out that you are deleting the correct category
 * @returns html div from new category
 */
function createNewCategoryAllsHTML(element, i) {
    return /*html*/ `
        <div onclick="selectCategory(${currentIndex})" id="addTask_category-${currentIndex}" class="addTask_categoryMediaDivSmoll">
            <div class="addTask_categoryMediaDivSmollDiv">
                <li class="addTask_taskCategory">${element['name']}</li>
                <div class="addTask_categoryMedia ${element['color']}"></div>
            </div>
            <div onclick="deleteCategory(${i})" class="addTask_closes3">&times;</div>
        </div>
    `;
}
/**
 * html code for show the contact at container
 * 
 * @param {string} element the person responsible for a task
 * @param {string} addreviatedName first letter from user
 * @returns html add contacts div
 */
function addContactssHTML(element, addreviatedName) {
    return /*html*/ `
        <div class="assignedAddContactDivs" style="background-color: ${element['color']}">
            <p class="assignedAddContactLetters">${addreviatedName}</p>          
        </div>
    `;
}
/**
 * html code for show the progressbar
 * 
 * @param {number} progresses the number of subtasks to be completed
 * @param {number} procent the percentage of subtasks completed
 * @param {number} i the number of the correct id of a task
 * @returns html div for progress bar
 */
function createTaskProgressbarHTML(progresses, procent, i) {
    return /*html*/ `
        <div class="progressBarBig">
            <div id="progressBar-${i}" class="progressBar" style="width: ${procent}%;"></div>
        </div>
        <span id="progressText-${i}" class="progressText">${progresses}</span>
    `;
}
/**
 * open the popup for Mobile
 * 
 * @returns 
 */
function openMoveToPoppupMobileHTML() {
    return /*html*/ `
        <div id="popupToMoveTaskMobile" class="popupToMoveTaskMobile" ontouchstart="save(event); closeMoveToPoppupMobile()">
            <div class="popupToMoveTaskMobileSelections">
                <div>Move to</div>
                <span ontouchstart="save(event); drop('todo'); save(event) ">To do</span>
                <span ontouchstart="save(event); drop('progress')">In Progress</span>
                <span ontouchstart="save(event); drop('feedback')">Feedback</span>
                <span ontouchstart="save(event); drop('done')">Done</span>
            </div>
        </div>
    `;
}
/**
 * html code for create the information for assigned To in the task
 * 
 * @param {string} color the color from user
 * @param {string} initials the firstletter from user
 * @returns html div to assigned task
 */
function createTaskAssignedToHTML(color, initials) {
    return /*html*/ `
        <div class="assignTask">
        <div class="divAssignTask" style="background-color: ${color}">${initials}</div>
        </div>
    `;
}
/**
 * html code for shows the subtasks in the task
 * 
 * @param {string} element the subtask
 * @param {boolean} checked give true or false in the check box for subtask
 * @param {number} taskIndex the number of the correct id of a task
 * @param {number} i the number of the correct id of a task
 * @returns html when you open the subtask
 */
function openCheckTaskSubtasksHTML(element, checked, taskIndex, i) {
    return /*html*/ `
        <div class="checkboxSubtasksContainer">
            <input onclick="putTheProgressBar(${taskIndex})" id="subtask-${i}" class="openCheckboxSubtasks" type="checkbox" data-value="${element}" ${checked}>
            <p class="openSubtasksComent">${element}</p>
        </div>   
    `;
}
/**
 * html code for show the contacts to edit in the list
 * 
 * @param {string} name the name from user
 * @param {string} color the color from user
 * @returns html div when you will task to edit
 */
function openTaskToEditContactsHTML(name, color) {
    let firstName = name[0] ? name[0] : '';
    let lastName = name[1] ? name[1] : '';
    let abbreviatedName = '';
    if (firstName && lastName) {
        abbreviatedName = `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
    } else if (firstName) {
        abbreviatedName = `${firstName[0].toUpperCase()}`;
    }
    return /*html*/ `
        <div class="assignTask">
            <div class="divAssignTask" style="background-color: ${color}">${abbreviatedName}</div>
        </div>
    `;
}
/**
 * html code for show the contacts under the list
 * 
 * @param {string} element the contact from user
 * @param {string} isAssigned The contacts are sorted here by alphabet
 * @returns html div when you show contacts to edit
 */
function showContactsInToEditHTML(element, isAssigned) {
    return /*html*/ `
        <label class="assignedToListBox">
            <li class="taskAssignedTo">${element}</li>
            <input  onclick="selectContactedToEdit(id)" class="inputCheckbox" type="checkbox" value="${element}" id="${element}"${isAssigned ? ' checked' : ''}>
        </label>
    `;
}
/**
 * html code for create a new category
 * 
 * @param {string} element the name from category
 * @param {number} i the number of the correct id of a task
 * @returns 
 */
function createnewCategoryAllHTML(element, i) {
    return /*html*/ `
        <div onclick="selectCategory(${currentIndex})" id="category-${currentIndex}" class="categoryMediaDivSmoll">
            <div class="categoryMediaDivSmollDiv">
                <li class="taskCategory">${element['name']}</li>
                <div class="categoryMedia ${element['color']}"></div>
            </div>
            <div onclick="deleteCategory(${i})" class="closes3">&times;</div>
        </div>
    `;
}
/**
 * html code for  displays the selected name and color
 * 
 * @param {string} element the contact from user for the task
 * @param {string} addreviatedName the first letter from contact
 * @returns html to add contacts
 */
function addContactsHTML(element, addreviatedName) {
    return /*html*/ `
        <div class="assignedAddContactDivs" style="background-color: ${element['color']}">
            <p class="assignedAddContactLetters">${addreviatedName}</p>          
        </div>
    `;
}
/**
 * html code for show all contacts
 * 
 * @param {string} name the name from contact
 * @returns html div from all contacts
 */
function openAllContactsHTML(name) {
    return /*html*/ `
        <label class="assignedToListBox">
            <li class="taskAssignedTo">${name}</li>
            <input  onclick="selectContacted(id)" class="inputCheckbox" type="checkbox" value="${name}" id="${name}">
        </label>
    `;
}
/**
 * html code for create an subtask
 * 
 * @param {string} element this is the subtask
 * @param {number} i the number of the correct id of a task
 * @returns html div subtask
 */
function SubtasksHTML(element, i) {
    return /*html*/ `
        <div class="checkboxSubtasksContainer">
            <!-- <input id="subtask-${i}" class="checkboxSubtasks" type="checkbox" data-value="${element}"> -->
            <p class="subtasksComent">${element}</p>
            <p class="deleteSubtask" onclick="deleteSubtask(${i})"> X</p>
        </div>
    `;
}

function deleteSubtask(i) {
    allSubtaskss.splice(i, 1);
    selectedSubtaskss.splice(i, 1);
    Subtaskss();
}
/**
 * html code for open the container for delete an task
 * 
 * @param {number} taskIndex the number of the correct id of a task to delete
 * @returns html div to delete task
 */
function toAskDeleteTaskHTML(taskIndex) {
    return /*html*/ `
        <div class="askDeleteTask">
            <p class="deleteTaskTesx">Möchten Sie diese Task wirklich löschen?</p>
            <div>
                <button class="deleteTaskAnswer" onclick="deleteTask(${taskIndex})">Ja</button>
                <button id="deleteTaskAnswer" onclick="NonDeleteTask()" class="deleteTaskAnswer">Nein</button>
            </div>
        </div>
    `;
}
/**
 * html code for shows the first letter of the name in the task
 * 
 * @param {string} color the color from user contact
 * @param {string} initials the first letter from user contact
 * @returns html div open checked task names
 */
function openCheckTaskNamesHTML(color, initials) {
    return /*html*/ `
        <div class="openCheckAssignTask">
        <div class="openCheckDivAssignTask" style="background-color: ${color}">${initials}</div>
        </div>
    `;
}
/**
 * load the html code for load the active user
 * 
 * @param {string} name the name from active user
 * @param {string} color the color from active user
 * @returns html div from active user
 */
function loadActiveUsersHTML(name, color) {
    return /*html*/ `
        <p>Kanban Project Management Tool</p>
        <img id="logoMobile" class="logoMobile d-none" src="./asseds/img/biglogo.png">
        <div class="headerContentRight">
            <img src="./asseds/img/hacken.png">
            <img id="closeImgForMobile" onclick="help()" class="information" src="./asseds/img/information.png">
            <div id="userButton" onclick="showLogOutButton()" class="personLogIn" style="background-color: ${color}">
                ${name}    
            </div>
            <div id="logOutButton" class="logOutButton d-none" >
                <div class="logOutAddTask" onclick="logOut()">Log Out</div>
            </div>
        </div>
    `;
}
/**
 * html code for load the active user at summary
 * 
 * @param {sring} name the name from active user
 * @param {sring} color the color from active user
 * @returns html div active user on summary html site
 */
function loadActiveUsersSummaryHTML(name, color) {
    return /*html*/ `
        <p>Kanban Project Management Tool</p>
        <img id="logoMobile" class="logoMobile d-none" src="./asseds/img/biglogo.png">
        <div class="headerContentRight">
            <img onclick="helpSummary()" class="information" src="./asseds/img/information.png">
            <div id="userButton" onclick="showLogOutButtonSummary()" class="personLogIn" style="background-color: ${color}">
                ${name}
            </div>
            <div id="logOutButtonSummary" class="logOutButtonSummary d-none" >
                <div id="helpp" class="help d-none" onclick="helpSummary()">Help</div>
                <div id="legalNotice" class="legalNotice d-none" onclick="notice()">Legal Notice</div>
                <div id="dataProtectionLogOutButton" class="dataProtectionLogOutButton d-none" onclick="dataProtection()">Datenschutz</div>
                <div class="logOutSummary" onclick="logOut()">Log Out</div>
            </div>
        </div>
    `;
}