/**
 *  Area for search to Task 
 * 
 * main function to filter the task in the find function 
 * 
 */
function searchToTask() {
    searchFilterTodo();
    searchFilterProgress();
    searchFilterFeedback();
    searchFilterDone();
}
/**
 * 
 *  filter the task what is in todo list
 * 
 */
function searchFilterTodo() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    let filter = document.getElementById('containerTodos');
    filter.innerHTML = '';
    for (let i = 0; i < todo.length; i++) {
        let headlines = todo[i]['title'];
        let descriptions = todo[i]['description'];
        if (headlines.toLowerCase().includes(search) || descriptions.toLowerCase().includes(search)) {
            let element = todo[i];
            let initialsContainer = createTaskAssignedTo(element)
            let subtaskInitialsContainer = createTaskProgressbar(element, i)
            filter.innerHTML += createTaskHTML(initialsContainer, subtaskInitialsContainer, element)
        }
    }
}
/*
 *filter the task what is in progress list
 * 
 * 
 */
function searchFilterProgress() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    let filter = document.getElementById('containerProgresses');
    filter.innerHTML = '';
    for (let i = 0; i < progress.length; i++) {
        let headlines = progress[i]['title'];
        let descriptions = progress[i]['description'];
        if (headlines.toLowerCase().includes(search) || descriptions.toLowerCase().includes(search)) {
            let element = progress[i];
            let initialsContainer = createTaskAssignedTo(element)
            let subtaskInitialsContainer = createTaskProgressbar(element, i)
            filter.innerHTML += createTaskHTML(initialsContainer, subtaskInitialsContainer, element)
        }
    }
}
/*
 * filter the task what is in feedback list
 * 
 * 
 */
function searchFilterFeedback() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    let filter = document.getElementById('containerFeedbacks');
    filter.innerHTML = '';
    for (let i = 0; i < feedback.length; i++) {
        let headlines = feedback[i]['title'];
        let descriptions = feedback[i]['description'];
        if (headlines.toLowerCase().includes(search) || descriptions.toLowerCase().includes(search)) {
            let element = feedback[i];
            let initialsContainer = createTaskAssignedTo(element)
            let subtaskInitialsContainer = createTaskProgressbar(element, i)
            filter.innerHTML += createTaskHTML(initialsContainer, subtaskInitialsContainer, element)
        }
    }
}
/*
 *filter the task what is in done list
 * 
 * 
 */
function searchFilterDone() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    let filter = document.getElementById('containerDones');
    filter.innerHTML = '';
    for (let i = 0; i < done.length; i++) {
        let headlines = done[i]['title'];
        let desc = done[i]['description'];
        if (headlines.toLowerCase().includes(search) || desc.toLowerCase().includes(search)) {
            let element = done[i];
            let initialsContainer = createTaskAssignedTo(element)
            let subtaskInitialsContainer = createTaskProgressbar(element, i)
            filter.innerHTML += createTaskHTML(initialsContainer, subtaskInitialsContainer, element)
        }
    }
}