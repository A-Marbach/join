/**
 * includes all template to Html
 * 
 * 
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}
/**
 * show the log out button 
 * 
 * @param {string} color Random color generated for the user
 * @param {string} firstletter the first letters of the user
 * @returns the header from Join
 */
function showHeader(color, firstletter) {
    return /*html*/ `
        <div class="headerContent">
            <p class="headerContentText">Kanban Project Management Tool</p>
            <img src="./asseds/img/biglogo.png" class="d-none">
            <div class="headerContentRight">
                <div class="buttonsTopRight">
                    <img onclick="help()" class="information" src="./asseds/img/information.png">
                    <div id="userButton" onclick="showLogOutButton()" class="personLogIn" style="background-color: ${color}; cursor: pointer">${firstletter}</div>
                </div>
                <div id="logOutButton" class="logOutButton d-none">
                    <p onclick="help()" class="logOutButtonText d-none">Help</p>
                    <p onclick="notice()" class="logOutButtonText d-none">Legal Notice</p>
                    <p onclick="dataProtection()" class="logOutButtonText d-none">Datenschutz</p>
                    <p onclick="logOut()" class="logOutButtonText">Log Out</p>
                </div>
            </div>
        </div>
    `;
}
/**
 * Templates at contact.js
 * 
 * @param {string} firstChar the first letters of the user
 * @returns html div for first letter
 */
function contactLetterHeadline(firstChar) {
    return /*html*/ `
        <div id="contactLetter-${firstChar}" class="letter">
            <p class="letterP">${firstChar}</p>
            <div class="letterUnderline"></div>
        </div>
    `;
}
/**
 * show the contact in the List
 * 
 * @param {string} name the name from  user
 * @param {string} email the e-mail from user
 * @param {string} str the first letter from user
 * @param {string} color the collor from user
 * @param {number} i the number of id from user
 * @returns html div for user
 */
function showContactDiv(name, email, str, color, i) {
    return /*html*/ `
        <div id="contactDiv${i}" onclick="showContact(${i});" class="contactDiv hover">
            <div id="contactLetter${i}" style="background-color: ${color}" class="contactLetter">
                ${str}
            </div>
            <div class="contactName">
                <p class="name">${name}</p>
                <p class="email">${email}</p>
            </div>
        </div>
    `;
}
/**
 * show the container with the information of the contact
 * 
 * @param {string} str the firstletter from user
 * @param {string} name the name from  user
 * @param {string} email the e-mail from user
 * @param {number} phone the number from user
 * @param {number} i the number of id from user
 * @param {string} color 
 * @returns html div for contact
 */
function showBigConactDiv(str, name, email, phone, i, color) {
    return /*html*/ `   
    <div id="contactBox${i}" class="contactBox d-none">
            <div class="contact">
                <p style="background-color: ${color}" class="contactP">${str}</p>
                <div class="contactNameRight">
                    <p class="contactNameRightP">${name}</p>
                    <a href="./add_task.html"><div class="addTaskBox">
                        <img src="./asseds/img/blueplus.png">
                        <p class="addTask">Add Task</p>
                    </div></a>
                </div>
            </div>

            <div class="contactInfo">
                <p class="contactInfoP">Contact Information</p>
                <div onclick="showEditContactBox(${i})" class="contactInfoEdit">
                    <img src="./asseds/img/pencil.png">
                    <p class="contactInfoEditP">Edit Contact</p>
                </div>
            </div>

            <div class="phoneMailBox">
                <div class="mail">
                    <p class="mailP">Email</p>
                    <p class="mailAdress">${email}</p>
                </div>
                <div class="mail">
                    <p class="mailP">Phone</p>
                    <p class="phoneNumber">${phone}</p>
                </div>
            </div>
        </div>
        <div onclick="showEditContactBox(${i})" class="editMobileBox d-none">
            <img src="./asseds/img/whitePencil.png">
        </div>
    `;
}
/**
 * show the container for to edit the contact
 * 
 * @param {number} i the number that was assigned to the user
 * @param {string} color the number from  user
 * @param {string} str the firstletter from user
 * @returns html div for edit the contacts
 */
function editContactBox(i, color, str) {
    return /*html*/ `   
        <div id="editContactBox${i}" class="newContactBox">
            <img onclick="closeEditBox()" class="closeImg" src="./asseds/img/cross.png">
            <img onclick="closeEditBox()" class="closeImgMobile d-none" src="./asseds/img/closewhite.png">
            <div class="leftContent">
                <img src="./asseds/img/littleLogo.png">
                <h1>Edit Contact</h1>
                <div class="newContactBoxLine"></div>
            </div>

            <div class="contactRightContent">
                <div class="contactRightContentImg">
                    <p style="background-color: ${color}" class="contactP">${str}</p>
                </div>
                <form class="inputFieldSection">
                    <div class="inputField">
                        <input id="input1Filled" type="name" required placeholder="Name">
                    </div>
                    <div class="inputField">
                        <input id="input2Filled" type="email" required placeholder="Email">
                    </div>
                    <div class="inputField">
                        <input id="input3Filled" type="number" required placeholder="Phone">
                    </div>
                </form>

                <div class="SaveButtonDiv">
                    <div class="delete-button" onclick="deleteContact(${i})">
                        <p>Delete</p>
                    </div>
                    <div onclick="saveContactChanges(${i})" class="saveButton">
                        <p>Save</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}
/**
 * template for Board - load the html code for create an task
 * 
 * @param {string} initialsContainer the first letter container from user
 * @param {string} subtaskInitialsContainer determines the number of finished subtasks for the progress bar
 * @param {string} element a task that has been created
 * @returns create task in html
 */
function createTaskHTML(initialsContainer, subtaskInitialsContainer, element) {
    return /*html*/ `
        <div  onclick="openCheckTask(${element['id']})" draggable="true" ondragstart="drag(${element['id']})" ontouchstart="touchstart(${element['id']})" ontouchend="touchend(${element['id']})" class="containerBlock" id="containerBlock-${element['id']}">
            <div class="addCategoryInTask ${element['category']['color']}">
                <p>${element['category']['name']}</p>
            </div>
            <div>
                <p>${element['title']}</p>
            </div>
            <div>
                <p>${element['description']}</p>
            </div>

            <div class="progressContainer" id="progressContainer">
                ${subtaskInitialsContainer}
            </div>

            <div class="assignTaskSelect">
                <div class="assignTaskSelectName">
                    ${initialsContainer}
                </div>
                <div class="assignTaskSelectImage">
                    <img src="${element['prio']['coloredImage']}">
                </div>
            </div>
        </div>
    `;
}
/**
 * load the html code for open the task 
 * 
 * @param {string} initialsName the first letter from user
 * @param {string} fullinitialsName the full name from user
 * @param {number} dateFormatted the date on which the task should be completed
 * @param {string} task the actually task
 * @param {number} taskIndex the number at the task
 * @returns html to open task
 */
function openCheckTaskHTML(initialsName, fullinitialsName, dateFormatted, task, taskIndex) {
    return /*html*/ `
        <div class="openCheckTaskBigDiv">
            <div class="openCheckTasksCategory ${task.category.color}">
                <p class="openCheckTasksCategoryTesx" >${task.category.name}</p>
            </div>

            <div class="openCheckTasksTitle">
                <p class="openCheckTasksTitleTest">${task.title}</p>
            </div>

            <div class="openCheckTasksDescription">
                <p class="openCheckTasksDescriptionTest">${task.description}</p>
            </div>

            <div class="openCheckTasksDateDiv">
                <p class="openCheckTasksDateText">Due date:</p> <p class="openCheckTasksDateFormat">${dateFormatted}</p>
            </div>

            <div class="openCheckTasksPrioDiv">
                <div>
                    <p class="openCheckTasksPrioText">Priority:</p>
                </div>
                <div class="openCheckTasksPrioTextDiv ${task.prio.color}">
                    <p class="openCheckTasksPrioTextText">${task.prio.text}</p>
                    <img  class="openCheckTasksPrioTextImage" src="${task.prio.whiteImage}">
                </div>
            </div>

            <div>
                <p class="openCheckTasksAssignedToTitle">Assigned To:</p>
                <div class="openCheckTasksAssignedToSmallDiv">
                    <div>
                        ${initialsName}
                    </div>
                    <div class="openCheckTasksAssignedToBoxFullName">
                    ${fullinitialsName}
                    </div>
                </div>
            </div>

            <p id="openCheckTasksAssignedToTitleDelete" class="openCheckTasksAssignedToTitle">Subtasks:</p>
            <div id="openCheckTasksAssignedToTitle">
            </div>

            <button class="deleteTaskButton" onclick="toAskDeleteTask(${taskIndex})">
                <img  class="deleteTaskImage" src="./asseds/img/delete-white.png">
            </button>

            <button class="toEditTaskButton" onclick="openTaskToEdit(${taskIndex})">
                <img  class="toEditTaskImage" src="./asseds/img/Group 8.png">
            </button>
            <div onclick="closeContainer1()" class="closes2">&times;</div>
            <img onclick="closeContainer1()" class="closes4" src="./asseds/img/arrow-left-line.png">
        </div>
    `;
}
/**
 * loaad the html code for open the task to edit
 * 
 * @param {string} task the actually task
 * @param {number} duaDate the date on which the task should be completed
 * @param {number} taskIndex the number at the task
 * @returns html when you open the task to edit
 */
function openTaskToEditHTML(task, duaDate, taskIndex) {
    return /*html*/ `
        <div class="toEditopenCheckTaskBigDiv" id="editTaskForm">
            <div class="toEditTaskTitleDiv">
                <label class="titleInputFields" for="editTaskTitle">Title</label>
                <input class="toEditTaskTitelInput" type="text" id="editTaskTitle" value="${task.title}">
            </div>
            
            <div class="toEditTaskTitleDiv">
                <label class="titleInputFields" for="editTaskDescription">Description</label>
                <textarea class="toEditTaskDescriptionInput" id="editTaskDescription">${task.description}</textarea>
            </div>

            <div class="toEditTaskTitleDiv">
                <label class="titleInputFields" for="editTaskDueDate">Due date</label>
                <input class="toEditTaskTitelInput" type="date" id="editTaskDueDate" value="${duaDate}">
            </div>
            <p class="titleInputFields">Prio</p>
            <div id="prio" class="prio">
                <div id="toEditRed" onclick="toEditChangeColor(id)" class="prioContainer">Urgent
                    <img id="toEditRedImg" src="./asseds/img/pfeil-oben-rot.png">
                </div>
                <div id="toEditYellow" onclick="toEditChangeColor(id)" class="prioContainer">Medium
                    <img id="toEditYellowImg" class="medium" src="./asseds/img/medium-gelb.png">
                </div>
                <div id="toEditGreen" onclick="toEditChangeColor(id)" class="prioContainer">Low
                    <img id="toEditGreenImg" src="./asseds/img/pfeil-unten-grün.png">
                </div>
            </div>
            <p class="titleInputFields">Assigned to</p>
            <div id="openContactToEdit" onclick="openContactsToEdit()" class="assignedDiv1">
                <p class="assignedContactsSelectToEdit" id="assignedContactsSelect">Select contacts to assign</p>
                <img id="assignedContactImg" src="./asseds/img/Vector 2.png">
            </div>
            <div id="assignedToListToEdit" class="assignedToListToEdit d-none">
            </div>
            <div class="assignedAddContactToEdit" id="assignedAddContacts">
            </div>

            <button class="toEditTaskSaveButton" onclick="saveTask(${taskIndex}); closeTaskToEdit();">
                <p class="toEditTaskButtonText">Ok</p>
                <img class="toEditTaskImage" src="./asseds/img/check.png">
            </button>
        </div>
`;
}