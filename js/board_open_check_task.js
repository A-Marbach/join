let contactsIsOpenEdit = false;
/**
 * Area for openCheckTask filter the onclick task for open the task 
 * 
 * @param {number} Index - the id to filter the task
 */
function openCheckTask(Index) {
    // console.log(touchStartActive);
    if (!touchStartActive) {
        let openToCheck = users[activeUser]['tasks'].filter(x => x.id == Index);
        let openTocheckRightTask = users[activeUser]['tasks'].indexOf(openToCheck[0]);
        openCheckTasks(openTocheckRightTask);
    }
}
/**
 * open the task
 * 
 * 
 * @param {number} taskIndex - the id to open the task
 */
async function openCheckTasks(taskIndex) {
    document.getElementById('closeContainer2').classList.remove('d-none');
    let container = document.getElementById('checkTaskSmall');
    container.innerHTML = '';
    let initialsName = openCheckTaskNames(taskIndex);
    let fullinitialsName = openCheckTaskFullNames(taskIndex);
    let dateFormatted = dateOpenCheckTask(taskIndex);
    let task = users[activeUser]['tasks'][taskIndex];
    container.innerHTML = openCheckTaskHTML(initialsName, fullinitialsName, dateFormatted, task, taskIndex);
    let subinitialContainer = openCheckTaskSubtasks(taskIndex);
    document.getElementById('openCheckTasksAssignedToTitle').innerHTML = subinitialContainer;
    openCheckTaskTakeInputValue();
    selectedSubtasksProgress = users[activeUser]['tasks'][taskIndex].subtaskChecked;
}
/**
 * open the container for delete an task
 * 
 * 
 * @param {number} taskIndex - the id to open container for delete task
 */
function toAskDeleteTask(taskIndex) {
    document.getElementById('bigDivDeleteTask').classList.remove('d-none');
    let deleteTasks = document.getElementById('bigDivDeleteTask');
    deleteTasks.innerHTML = toAskDeleteTaskHTML(taskIndex);
}
/**
 * open the container for text delete task
 * 
 * 
 */
function NonDeleteTask() {
    document.getElementById('bigDivDeleteTask').classList.add('d-none');
}
/**
 * delete task
 * 
 * 
 * @param {number} taskIndex - the id to delete an task
 */
async function deleteTask(taskIndex) {
    allTasks.splice(taskIndex, 1);
    users[activeUser]['tasks'].splice(taskIndex, 1);
    await backend.deleteItem('allTasks', allTasks);
    await backend.deleteItem('users', users);
    filterTasks();
    addTasking();
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    await backend.setItem('users', JSON.stringify(users));
    closeContainer1();
    document.getElementById('bigDivDeleteTask').classList.add('d-none')
}
/**
 * show the date in the task
 * 
 * 
 * @param {number} taskIndex - the id to show the date
 *  
 */
function dateOpenCheckTask(taskIndex) {
    let task = users[activeUser]['tasks'][taskIndex];
    let taskDate = new Date(task.dueDates);
    let formattedDate = taskDate.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    return formattedDate;
}
/**
 * shows the first letter of the name in the task
 * 
 * 
 * @param {number} taskIndex - the id to show the first letter of the name
 * 
 */
function openCheckTaskNames(taskIndex) {
    let names = users[activeUser]['tasks'][taskIndex];
    let nameParts = names.assignedTo;

    // Sicherstellen, dass nameParts definiert ist und ein Array ist
    if (!nameParts || !Array.isArray(nameParts)) {
        console.error('assignedTo is not defined or not an array:', nameParts);
        return ''; // Oder alternativ einen Fehler werfen
    }

    let initialsContainer = '';
    for (let j = 0; j < nameParts.length; j++) {
        let person = nameParts[j];
        
        // Überprüfen, ob person definiert ist und die Eigenschaften 'name' und 'color' hat
        if (!person || !person.name || !person.color) {
            console.error('Person object is missing required properties:', person);
            continue; // Zum nächsten Element fortfahren
        }

        let name = person.name.split(' ');
        let color = person.color;

        // Initialen bilden
        let initials = name[0][0].toUpperCase(); // Erster Buchstabe des Vornamens
        if (name.length > 1 && name[1][0]) { // Prüfen, ob ein Nachname existiert
            initials += name[1][0].toUpperCase(); // Erster Buchstabe des Nachnamens
        }

        initialsContainer += openCheckTaskNamesHTML(color, initials);
    }
    return initialsContainer;
}
/**
 * show the full name in the task
 * 
 * 
 * @param {number} taskIndex - the id to show the full name in the task
 * 
 */
function openCheckTaskFullNames(taskIndex) {
    let fullNames = users[activeUser]['tasks'][taskIndex];
    let fullNameParts = (fullNames.assignedTo);
    let fullNameInitialsContainer = '';
    for (let j = 0; j < fullNameParts.length; j++) {
        let name = fullNameParts[j]['name'];
        fullNameInitialsContainer += /*html*/ `
        <div class="openCheckAssignTaskDivFullName">
            <p class="openCheckAssignTaskFullName">${name}</p>
        </div>    
      `;
    }
    return fullNameInitialsContainer;
}
/**
 * shows the subtasks in the task
 * 
 * 
 * @param {number} taskIndex - the id to show the subtask in the task
 * 
 */
function openCheckTaskSubtasks(taskIndex) {
    const { subtask, subtaskChecked = [] } = users[activeUser]['tasks'][taskIndex];
    let subtaskInitialsContainer = '';
    subtask.forEach((element, i) => {
        const checked = subtaskChecked.includes(element) ? 'checked' : '';
        subtaskInitialsContainer += openCheckTaskSubtasksHTML(element, checked, taskIndex, i);
    });
    if (!subtask.length) {
        document.getElementById('openCheckTasksAssignedToTitleDelete').classList.add('d-none');
    }
    return subtaskInitialsContainer;
}
/**
 * calculates the progress of the subtasks
 * 
 * 
 * @param {number} taskIndex - the id to calculates the progress for the subtask
 */
async function putTheProgressBar(taskIndex) {
    setTimeout(function () {
        openCheckTaskTakeInputValue()
        for (let i = 0; i < selectedSubtasksProgress.length; i++) {
            if (users[activeUser]['tasks'][taskIndex].subtaskChecked.indexOf(selectedSubtasksProgress[i]) === -1) {
                users[activeUser]['tasks'][taskIndex].subtaskChecked.push(selectedSubtasksProgress[i]);
            }
        }
        users[activeUser]['tasks'][taskIndex].subtaskChecked = selectedSubtasksProgress;
        selectedSubtasksForProgress = [];
    }, 200)
    await backend.setItem('users', JSON.stringify(users));
    filterTasks();
    addTasking();
}
/**
 * ticks the already selected subtasks
 * 
 * 
 */
function openCheckTaskTakeInputValue() {
    document.querySelectorAll('.openCheckboxSubtasks').forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const value = this.dataset.value;
            if (this.checked) {
                if (!selectedSubtasksProgress.includes(value)) {
                    selectedSubtasksProgress.push(value);
                }
            } else {
                const index = selectedSubtasksProgress.indexOf(value);
                if (index > -1) {
                    selectedSubtasksProgress.splice(index, 1);
                }
            }
        });
    });
}
/**
 * open the task for to edit
 * 
 * 
 * @param {number} taskIndex - the id to edit the task
 */ 
function openTaskToEdit(taskIndex) {
    document.getElementById('checkTaskSmall').classList.add('d-none');
    document.getElementById('toEditTaskMainDiv').classList.remove('d-none');
    let task = users[activeUser]['tasks'][taskIndex];
    let duaDate = openTaskToEditDate(taskIndex);
    let toEditTaskMainDiv = document.getElementById('toEditTaskMainDiv');
    toEditTaskMainDiv.innerHTML = openTaskToEditHTML(task, duaDate, taskIndex);
    showContactsInToEdit(taskIndex);
    let addContacts = openTaskToEditContacts();
    document.getElementById('assignedAddContacts').innerHTML = addContacts;
    openTaskToEditPrioImage(taskIndex);
}
/**
 * show the date to edit
 * 
 * 
 * @param {number} taskIndex - the id to edit the date
 * 
 */
function openTaskToEditDate(taskIndex) {
    let task = users[activeUser]['tasks'][taskIndex];
    let taskDate = new Date(task.dueDates);
    let formattedDate = taskDate.toISOString().substring(0, 10);
    return formattedDate;
}
/**
 * show the contacts to edit in the list
 * 
 *  
 */
function openTaskToEditContacts() {
    let initialsContainer = '';
    for (let j = 0; j < assignedChackedBox.length; j++) {
        if (j < 3) {
            let name = assignedChackedBox[j]['name'].split(' ');
            let color = assignedChackedBox[j]['color'];
            initialsContainer += openTaskToEditContactsHTML(name, color);
        } else {
            initialsContainer += /*html*/ `
                <div class="nameContainer">+${assignedChackedBox.length - 3}</div>`;
            break;
        }
    }
    return initialsContainer;
}
/**
 * show the prio buttons to edit  
 * 
 * 
 * @param {number} taskIndex - the id to edit the prio buttons
 */
function openTaskToEditPrioImage(taskIndex) {
    let task = users[activeUser]['tasks'][taskIndex];
    if (task.prio.text === 'Urgent') {
        document.getElementById('toEditRed').classList.add('red');
        document.getElementById('toEditRedImg').src = './asseds/img/pfeil-oben-weiss.png';
    } else if (task.prio.text === 'Medium') {
        document.getElementById('toEditYellow').classList.add('yellow');
        document.getElementById('toEditYellowImg').src = './asseds/img/medium-weiss.png';
    } else if (task.prio.text === 'Low') {
        document.getElementById('toEditGreen').classList.add('green');
        document.getElementById('toEditGreenImg').src = './asseds/img/pfeil-unten-weiss.png';
    }
}
/**
 * close the container for task to edit
 * 
 * 
 */
function closeTaskToEdit() {
    document.getElementById('checkTaskSmall').classList.remove('d-none');
    document.getElementById('toEditTaskMainDiv').classList.add('d-none');
    assignedChackedBox = [];
    colorArray = [];
}
/**
 * open the list for edit the contacts
 * 
 * 
 */
function openContactsToEdit() {
    let allContacts = document.getElementById('assignedToListToEdit');
    if (allContacts.classList.contains('d-none')) {
        contactsIsOpenEdit = true;
        allContacts.classList.remove('d-none');
        document.getElementById('openContactToEdit').classList.add('assignedDivBorder');
        document.getElementById('assignedToListToEdit').addEventListener("click", (event) => {
            event.stopPropagation(); // Prevent the click event from reaching the window listener
        });
    } 
}
window.addEventListener("click", (even) => {
    if (even.target != document.getElementById("openContactToEdit")
        && even.target != document.getElementById("assignedContactImg")
        && even.target != document.getElementById('addTask_assignedToList')) {
        if (contactsIsOpenEdit) {
            let category = document.getElementById('assignedToListToEdit');
            category.classList.add('d-none');
            document.getElementById('assignedToListToEdit').classList.remove('borderButton');
            contactsIsOpenEdit = false;
        }
    }
})
/**
 * edit the contacts and push in the array
 * 
 * 
 * @param {number} id - the id to edit the contacts
 */
function selectContactedToEdit(id) {
    let contact = users[activeUser]['contacts'].find(contact => contact.contactName === id);
    let index = assignedChackedBox.findIndex(c => c.name === contact.contactName);
    if (index === -1) {
        assignedChackedBox.push({ name: contact.contactName, color: contact.contactColor });
    } else {
        assignedChackedBox.splice(index, 1);
    }
    let addContactss = openTaskToEditContacts();
    document.getElementById('assignedAddContacts').innerHTML = addContactss;
}
/**
 *  show the contacts under the list
 * 
 * 
 * @param {number} taskIndex - the id for the contacts
 */
function showContactsInToEdit(taskIndex) {
    const toEdit = document.getElementById('assignedToListToEdit');
    toEdit.innerHTML = '';
    const currentContacts = users[activeUser]['tasks'][taskIndex];
    users[activeUser]['contacts'].forEach(contact => {
        const element = contact['contactName'];
        const isAssigned = currentContacts.assignedTo.some(a => a.name === element);
        toEdit.innerHTML += showContactsInToEditHTML(element, isAssigned);
    });
    document.getElementById("editTaskDueDate").setAttribute("min", currentDate.toISOString().split('T')[0]);
    showContactsInToEditPushInAssigned()
}
/**
 * show the selected contacts in the list
 * 
 * 
 */
function showContactsInToEditPushInAssigned() {
    const checkboxess = document.querySelectorAll('input.inputCheckbox:checked');
    for (let i = 0; i < checkboxess.length; i++) {
        const checkboxx = checkboxess[i];
        const name = checkboxx.value;
        let color = getColorForContact(name);
        assignedChackedBox.push({
            name,
            color
        });
    }
}
/**
 * get the color from the contact
 * 
 * 
 * @param {string} contactName - the name of the contact
 * @returns 
 */
function getColorForContact(contactName) {
    for (let i = 0; i < users[activeUser]['contacts'].length; i++) {
        if (users[activeUser]['contacts'][i].contactName === contactName) {
            return users[activeUser]['contacts'][i].contactColor;
        }
    }
    return null;
}
/**
 * save the date what is to edit
 * 
 * 
 * @param {number} taskIndex - the id from task to edit the date
 */
async function saveTask(taskIndex) {
    const updatedTitle = document.getElementById("editTaskTitle").value;
    const updatedDescription = document.getElementById("editTaskDescription").value;
    const updatedDueDate = document.getElementById("editTaskDueDate").value;
    const task = users[activeUser]['tasks'][taskIndex];
    Object.assign(task, { title: updatedTitle, description: updatedDescription, dueDates: updatedDueDate });
    updateTaskPriority(task, colorArray);
    assignedChackedBox.filter(box => !task.assignedTo.some(a => a.name === box.name)).forEach(box => {
        task.assignedTo.push(box);
    });
    task.assignedTo = assignedChackedBox;
    filterTasks();
    addTasking();
    await Promise.all([
        backend.setItem('users', JSON.stringify(users))
    ]);
    openCheckTasks(taskIndex);
}
/**
 * save the prio date
 * 
 * 
 * @param {string} task - the task from user
 * @param {string} colorArray - update the color from task
 */
function updateTaskPriority(task, colorArray) {
    if (Object.keys(colorArray).length > 0) {
        Object.assign(task.prio, {
            color: colorArray.color,
            text: colorArray.text,
            coloredImage: colorArray.coloredImage,
            whiteImage: colorArray.whiteImage
        });
    }
}
