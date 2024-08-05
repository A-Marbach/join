/**
 * Area for Assigned To - open the cantact list
 * 
 * 
 */
function openContactss() {
    let allContacts = document.getElementById('addTask_assignedToList');
    if (allContacts.classList.contains('d-none')) {
        contactsIsOpen = true;
        allContacts.classList.remove('d-none');
        document.getElementById('addTask_openContact').classList.add('assignedDivBorderToEdit');
        document.getElementById('addTask_assignedToList').addEventListener("click", (event) => {
            event.stopPropagation(); // Prevent the click event from reaching the window listener
        });
    } 
    // else {
    //     allContacts.classList.add('d-none');
    //     document.getElementById('addTask_openContact').classList.remove('assignedDivBorderToEdit');
    // }
}
window.addEventListener("click", (event) => {
    if (event.target != document.getElementById("addTask_openContact")) {
        if (contactsIsOpen) {
            let category = document.getElementById('addTask_assignedToList');
            if(event.target != document.getElementById('addTask_assignedToList')){
                category.classList.add('d-none');
                document.getElementById('addTask_assignedToList').classList.remove('borderButton');
                contactsIsOpen = false;
            }
         
        }
    }
})

/**
 * load all contacts 
 * 
 * 
 */
function openAllContactss() {
    let assignedToList = document.getElementById('addTask_assignedToList');
    assignedToList.innerHTML = '';
    for (let i = 0; i < users[activeUser]['contacts'].length; i++) {
        const name = users[activeUser]['contacts'][i]['contactName'];
        assignedToList.innerHTML += /*html*/ `
        <label class="assignedToListBox">
            <li class="taskAssignedTo">${name}</li>
            <input  onclick="selectContacteds(id)" class="inputCheckbox" type="checkbox" value="${name}" id="${name}">
        </label>
    `;
    }
}
/**
 * push the selected name and color in array
 * 
 * 
 * @param {number} id - the id for the name and color from contact 
 */
function selectContacteds(id) {
    let chackedBox = document.getElementById(id);
    if (chackedBox.checked) {
        let elementColor = selectColorContacts(id);
        assignedChackedBoxes.push({
            'name': chackedBox.value,
            'color': elementColor
        });
    } else {
        assignedChackedBoxes = assignedChackedBoxes.filter(e => e.name !== chackedBox.value);
    }
    addContactss();
}
/**
 * selected the color from contact
 * 
 * 
 * @param {number} id - the id for the color from contact
 * 
 */
function selectColorContacts(id) {
    for (let i = 0; i < users[activeUser]['contacts'].length; i++) {
        if (users[activeUser]['contacts'][i].contactName === id) {
            return users[activeUser]['contacts'][i].contactColor;
        }
    }
    return null;
}
/**
 * add the contact in container to show the name
 * 
 * 
 */
function addContactss() {
    let assignedAddContact = document.getElementById('addTask_assignedAddContact');
    assignedAddContact.innerHTML = '';
    for (let i = 0; i < assignedChackedBoxes.length; i++) {
        const element = assignedChackedBoxes[i];
        let nameParts = element['name'].split(' ');
        let firstName = nameParts[0];
        let lastName = nameParts[1];
        let addreviatedName = firstName[0];
        assignedAddContact.innerHTML += addContactssHTML(element, addreviatedName)
    }
}
/**
 * reset the checkbox after choose the object
 * 
 * 
 */
function resetCheckboxes() {
    assignedChackedBoxes = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = false);
}
/**
 * Area for Prio container  - for select the color and image of priority at to edit an task
 * 
 */
function containerchangeColors() {
    const redElement = document.getElementById('addTask_Red');
    const yellowElement = document.getElementById('addTask_Yellow');
    const greenElement = document.getElementById('addTask_Green');
    redElement.classList.remove('red');
    yellowElement.classList.remove('yellow');
    greenElement.classList.remove('green');
    document.getElementById('addRedImg').src = './asseds/img/pfeil-oben-rot.png';
    document.getElementById('addYellowImg').src = './asseds/img/medium-gelb.png';
    document.getElementById('addGreenImg').src = './asseds/img/pfeil-unten-grün.png';
    return { redElement, yellowElement, greenElement };
}
/**
 * choose the prio and push the picture and color to array
 * 
 * 
 * @param {string} color - the color from the user
 */
function changeColors(color) {
    const { redElement, yellowElement, greenElement } = containerchangeColors();
    let text;
    let coloredImage;
    let whiteImage;
    let actualColor;
    if (color === 'addTask_Red') {
        redElement.classList.add('red');
        document.getElementById('addRedImg').src = './asseds/img/pfeil-oben-weiss.png';
        text = redElement.textContent.trim();
        coloredImage = './asseds/img/pfeil-oben-rot.png';
        whiteImage = './asseds/img/pfeil-oben-weiss.png';
        actualColor = 'red';
    } else if (color === 'addTask_Yellow') {
        yellowElement.classList.add('yellow');
        document.getElementById('addYellowImg').src = './asseds/img/medium-weiss.png';
        text = yellowElement.textContent.trim();
        coloredImage = './asseds/img/medium-gelb.png';
        whiteImage = './asseds/img/medium-weiss.png';
        actualColor = 'yellow';
    } else if (color === 'addTask_Green') {
        greenElement.classList.add('green');
        document.getElementById('addGreenImg').src = './asseds/img/pfeil-unten-weiss.png';
        text = greenElement.textContent.trim();
        coloredImage = './asseds/img/pfeil-unten-grün.png';
        whiteImage = './asseds/img/pfeil-unten-weiss.png';
        actualColor = 'green';
    }
    colorArray = { color: actualColor, text: text, coloredImage: coloredImage, whiteImage: whiteImage };
}
/**
 * reset the colorbar after create on task
 * 
 * 
 */
function resetSettingsChangeColors() {
    document.getElementById('addTask_Red').classList.remove('red');
    document.getElementById('addRedImg').src = './asseds/img/pfeil-oben-rot.png';
    document.getElementById('addTask_Yellow').classList.remove('yellow');
    document.getElementById('addYellowImg').src = './asseds/img/medium-gelb.png';
    document.getElementById('addTask_Green').classList.remove('green');
    document.getElementById('addGreenImg').src = './asseds/img/pfeil-unten-grün.png';
    colorArray = [];
}
/**
 * Area for Subtasks open the subtasks list
 * 
 * 
 */
function openSubtasks() {
    document.getElementById('addTask_subtasksAddImg').classList.add('d-none');
    document.getElementById('addTask_subtsasksCancelImg').classList.remove('d-none');
    document.getElementById('addTask_subtasksSubLine').classList.remove('d-none');
    document.getElementById('addTask_subtasksChackImg').classList.remove('d-none');
}


/**
 * close the subtasks list
 * 
 * 
 */
function subtasksCancels() {
    document.getElementById('addTask_subtasksAddImg').classList.remove('d-none');
    document.getElementById('addTask_subtsasksCancelImg').classList.add('d-none');
    document.getElementById('addTask_subtasksSubLine').classList.add('d-none');
    document.getElementById('addTask_subtasksChackImg').classList.add('d-none');
    document.getElementById('addTask_openSubtasks').value = '';
}
/**
 * add subtasks after select it
 * 
 * 
 */
function addSubtaskss() {
    let openSubtasks = document.getElementById('addTask_openSubtasks').value;
    if (openSubtasks.length > 0) {
        allSubtaskss.push(openSubtasks);
        selectedSubtaskss.push(openSubtasks);
        Subtaskss();
    }
    document.getElementById('addTask_openSubtasks').value = '';
    subtasksCancels();
}
/**
 * show the selected subtasks 
 * 
 * 
 */
function Subtaskss() {
    let allAddSubtasks = document.getElementById('addTask_allAddSubtask');
    allAddSubtasks.innerHTML = '';
    for (let i = 0; i < allSubtaskss.length; i++) {
        const element = allSubtaskss[i];
        allAddSubtasks.innerHTML += /*html*/ `
      <div class="checkboxSubtasksContainer">
          <!-- <input id="addTask_subtask-${i}" class="checkboxSubtasks" type="checkbox" data-value="${element}"> -->
          <p class="subtasksComent">${element}</p>
          <p class="deleteSubtask" onclick="deleteSubtask(${i})">X</p>
      </div>
      `;
    }
    // querySelectorAlls();
}
/**
 * delete subtask
 * 
 * 
 * @param {number} i - the id to delete subtask
 */
function deleteSubtask(i) {
    allSubtaskss.splice(i, 1);
    selectedSubtaskss.splice(i, 1);
    Subtaskss();
}
/**
 * reset the subtask value field
 * 
 * 
 */
function resetSubtaskss() {
    document.getElementById('addTask_allAddSubtask').innerHTML = '';
    selectedSubtaskss = [];
    allSubtaskss = [];
}


function openSubtasksEdit() {
    document.getElementById('addTask_subtasksAddImgEdit').classList.add('d-none');
    document.getElementById('addTask_subtsasksCancelImgEdit').classList.remove('d-none');
    document.getElementById('addTask_subtasksSubLineEdit').classList.remove('d-none');
    document.getElementById('addTask_subtasksChackImgEdit').classList.remove('d-none');
}

function subtasksCancelsEdit() {
    document.getElementById('addTask_subtasksAddImgEdit').classList.remove('d-none');
    document.getElementById('addTask_subtsasksCancelImgEdit').classList.add('d-none');
    document.getElementById('addTask_subtasksSubLineEdit').classList.add('d-none');
    document.getElementById('addTask_subtasksChackImgEdit').classList.add('d-none');
    document.getElementById('editSubtask').value = '';
}

function addSubtaskssEdit() {
    let openSubtasks = document.getElementById('editSubtask').value;
    if (openSubtasks.length > 0) {
        allSubtaskss.push(openSubtasks);
        selectedSubtaskss.push(openSubtasks);
        Subtaskss();
    }
    document.getElementById('editSubtask').value = '';
    subtasksCancelsEdit();
}