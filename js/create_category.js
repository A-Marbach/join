
/**
 * Area for Category  - open the list for create and choose an category
 *  
 * 
 */
function openCategory() {
    if (newCategorySelected) {
        return;
    }
    let category = document.getElementById('addTask_categoryList');
    if (category.classList.contains('d-none')) {
        categoryIsOpen = true;
        category.classList.remove('d-none');
        document.getElementById('addTask_borderButton').classList.add('borderButton');
    }
}
window.addEventListener("click", (event) => {
    if (event.target != document.getElementById("addTask_borderButton") && event.target != document.getElementById("addTask_selectTaskCategoryImg")) {
        if (categoryIsOpen) {
            let category = document.getElementById('addTask_categoryList');
            category.classList.add('d-none');
            document.getElementById('addTask_borderButton').classList.remove('borderButton');
            categoryIsOpen = false;
        }
    }
})
/**
 * open and close the field if ist is not open
 * 
 * 
 */
function ifselectNewCategory() {
    document.getElementById('addTask_selectTaskCategory').classList.add('d-none');
    document.getElementById('addTask_categoryList').classList.add('d-none');
    document.getElementById('addTask_borderButton').classList.remove('borderButton');
    document.getElementById('addTask_containerColorPicker').classList.remove('d-none');
    document.getElementById('addTask_selectNewCategoryImg').classList.remove('d-none');
    document.getElementById('addTask_selectTaskCategoryImg').classList.add('d-none');
}
/**
 * open and close the field else ist is not open
 * 
 * 
 */
function elseselectNewCategory() {
    document.getElementById('addTask_selectTaskCategory').classList.remove('d-none');
    document.getElementById('addTask_categoryList').classList.remove('d-none');
    document.getElementById('addTask_borderButton').classList.add('borderButton');
    document.getElementById('addTask_containerColorPicker').classList.add('d-none');
    document.getElementById('addTask_selectNewCategoryImg').classList.add('d-none');
    document.getElementById('addTask_selectTaskCategoryImg').classList.remove('d-none');
}
/**
 * open the field for create an new category
 * 
 * 
 */
function selectNewCategory() {
    let selectNewCategory = document.getElementById('addTask_selectNewCategory');
    selectNewCategory.value = ``;
    if (selectNewCategory.classList.contains('d-none')) {
        selectNewCategory.classList.remove('d-none');
        ifselectNewCategory()
    } else {
        selectNewCategory.classList.add('d-none');
        elseselectNewCategory()
    }
    newCategorySelected = true;
}
/**
 * reset all collorpicker after create a new category
 * 
 * 
 */
function resetAllColorpicker() {
    document.getElementById('bg-pink').style = 'box-shadow: none;';
    document.getElementById('bg-orange').style = 'box-shadow: none;';
    document.getElementById('bg-green').style = 'box-shadow: none;';
    document.getElementById('bg-turquoise').style = 'box-shadow: none;';
    document.getElementById('bg-yellow').style = 'box-shadow: none;';
    document.getElementById('bg-blue').style = 'box-shadow: none;';
}
/**
 * create a new category
 * 
 * 
 */
async function createNewCategory() {
    const newCategory = document.getElementById('addTask_selectNewCategory').value;
    const currentCategoryColor = getCurrentCategoryColor();
    if (validateNewCategoryInput(newCategory, currentCategoryColor)) {
        const categoryExists = checkIfCategoryExists(newCategory, currentCategoryColor);

        if (!categoryExists) {
            const jsonColor = createJsonColor(newCategory, currentCategoryColor);
            addNewCategory(jsonColor);
            resetNewCategoryInput();
            showSuccessMessage('Eine neue Kategorie wurde erfolgreich erstellt.');
        } else {
            showErrorMessage('Eine Kategorie mit demselben Namen und derselben Farbe existiert bereits.');
        }
    }
    await backend.setItem('users', JSON.stringify(users));
    resetAllColorpicker();
}
/**
 * get current category color for create a category
 * 
 * 
 * @returns - - the color from current category
 */
function getCurrentCategoryColor() {
    return currentCategoryColor;
}
/**
 * validate New Category Input for create a category
 * 
 * 
 * @param {string} newCategory - the name from new category
 * @param {string} currentCategoryColor - the color from current category
 * 
 */
function validateNewCategoryInput(newCategory, currentCategoryColor) {
    if (!newCategory) {
        showErrorMessage('Bitte wählen Sie eine Kategorie aus');
        return false;
    }
    if (!currentCategoryColor) {
        showErrorMessage('Bitte wählen Sie eine Farbe für die neue Kategorie aus.');
        return false;
    }
    return true;
}
/**
 * check if category exists for create a category
 * 
 * 
 * @param {string} newCategory - the name from new category
 * @param {string} currentCategoryColor - the color from current category
 * 
 */
function checkIfCategoryExists(newCategory, currentCategoryColor) {
    return users[activeUser]['categorys'].some(category => category.name === newCategory && category.color === currentCategoryColor);
}
/**
 * push the name and color in array JsonColor 
 * 
 * 
 * @param {string} newCategory the name from new category
 * @param {string} currentCategoryColor - the color from current category
 * 
 */
function createJsonColor(newCategory, currentCategoryColor) {
    return {
        'name': newCategory,
        'color': currentCategoryColor,
    };
}
/**
 * save the new category in activeuser and load a funktion for create a new category
 * 
 * 
 * @param {string} jsonColor - new category with name and color
 */
function addNewCategory(jsonColor) {
    users[activeUser]['categorys'].push(jsonColor);
    createnewCategoryAlls();
}
/**
 * reset inputfield after create an new category
 * 
 * 
 */
function resetNewCategoryInput() {
    currentCategoryColor = null;
    selectNewCatagoryCancel();
    newCategorySelected = false;
}

// show the massega - new category is create 
function showSuccessMessage(message) {
    showMessage(message, 'success');
}
/**
 * show the message - please choose a color for the new category 
 * 
 * 
 * @param {string} message - message: to choose a color for the category
 */
function showErrorMessage(message) {
    showMessage(message, 'error');
}
/**
 * show message - create a new category
 * 
 * 
 * @param {string} message - message: to choose a category
 *
 */
function showMessage(message) {
    const container = document.getElementById('div');
    container.classList.remove('d-none');
    container.innerHTML = message;
    container.style.display = 'block';
    setTimeout(function () {
        container.style.display = 'none';
    }, 1000);
}
/**
 * select the color for category
 * 
 * 
 * @param {number} id the number from category to select a color
 */
function newCategorySelectColor(id) {
    currentCategoryColor = id;
    let colorPickers = document.getElementsByClassName('addTask_colorPicker')
    for (let item of colorPickers) {
        item.style = '';
    }
    document.getElementById(id).style = 'box-shadow: 0px 10px 12px -6px #000000;';
}
/**
 * cancel the category container
 * 
 * 
 */
function selectNewCatagoryCancel() {
    document.getElementById('addTask_selectNewCategoryImg').classList.add('d-none');
    document.getElementById('addTask_containerColorPicker').classList.add('d-none');
    document.getElementById('addTask_selectNewCategory').classList.add('d-none');
    document.getElementById('addTask_selectTaskCategory').classList.remove('d-none');
    document.getElementById('addTask_selectTaskCategoryImg').classList.remove('d-none');
    document.getElementById('addTask_categoryList').classList.remove('d-none');
    newCategorySelected = false;
}
/**
 * create the a new catagory
 * 
 * 
 */
function createnewCategoryAlls() {
    newCategorys = document.getElementById('addTask_createNewTategory');
    newCategorys.innerHTML = '';
    for (let i = 0; i < users[activeUser]['categorys'].length; i++) {
        const element = users[activeUser]['categorys'][i];
        newCategorys.innerHTML += createNewCategoryAllsHTML(element, i);
        currentIndex++;
    }
}
/**
 * select an category
 * 
 * 
 * @param {number} id - the id of the selected category
 */
function selectCategory(id) {
    const selectedElement = document.getElementById(`addTask_category-${id}`);
    const name = selectedElement.querySelector('.addTask_taskCategory').innerHTML;
    const color = selectedElement.querySelector('.addTask_categoryMedia').classList[1];
    allLiCategorys = ({ name, color });
    let ulCategory = document.getElementById("addTask_categoryList");
    let category = selectedElement.querySelector('.addTask_categoryMediaDivSmollDiv').innerHTML;
    document.getElementById('addTask_selectTaskCategory').style = 'display: flex; align-items: center; list-style-type: none; margin-left: -18px;';
    document.getElementById("addTask_selectTaskCategory").innerHTML = category;
    ulCategory.classList.add('d-none');
    document.getElementById('addTask_borderButton').classList.remove('borderButton');
}
/**
 * delete category
 * 
 * 
 * @param {number} i number of the category to be deleted
 */
async function deleteCategory(i) {
    users[activeUser]['categorys'].splice(i, 1);
    await backend.deleteItem('users', users);
    createnewCategoryAlls();
    await backend.setItem('users', JSON.stringify(users));
}
/**
 * reset the settings from the category
 * 
 * 
 */
function resetSettingsCategorys() {
    let selectTaskCategory = document.getElementById("addTask_selectTaskCategory");
    document.getElementById("addTask_selectTaskCategory").innerHTML = '';
    document.getElementById('addTask_selectTaskCategory').style = 'margin-left: 0px;';
    selectTaskCategory.innerHTML = "Select Task Category";
    allLiCategorys = [];
}