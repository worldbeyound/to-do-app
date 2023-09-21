const task_list = document.getElementById("tasks");
const button = document.getElementById("addTask");
const input = document.getElementById("searchBar");

function createNewTask(taskName, isNew, ID){

    // Creating new task
    const new_task = document.createElement("div");
    new_task.classList.add("task");

    // Adding contents of task
    const new_task_contents = document.createElement("div");
    new_task_contents.classList.add("contents");

    const new_task_finish = document.createElement("button");
    new_task_finish.classList.add("taskFinish");

    const new_task_text = document.createElement("input");
    new_task_text.classList.add("taskTextNormal");
    new_task_text.readOnly = "readOnly";
    new_task_text.placeholder = taskName;

    new_task_contents.appendChild(new_task_finish);
    new_task_contents.appendChild(new_task_text);

    new_task.appendChild(new_task_contents);

    // Edit, delete buttons
    const new_task_buttons = document.createElement("div");
    new_task_buttons.classList.add("actionButtons");

    const new_task_buttons_edit = document.createElement("button");
    new_task_buttons_edit.innerText = "Edit";
    new_task_buttons_edit.classList.add("editButton");

    const new_task_buttons_delete = document.createElement("button");
    new_task_buttons_delete.innerText = "Delete";
    new_task_buttons_delete.classList.add("deleteButton");

    new_task_buttons.appendChild(new_task_buttons_edit);
    new_task_buttons.appendChild(new_task_buttons_delete);

    new_task.appendChild(new_task_buttons);

    new_task_finish.addEventListener('click', () => {
        if (new_task_text.classList[0] == "taskTextNormal"){
            new_task_text.style.textDecorationLine = "line-through";
            new_task_text.classList.add("taskTextCrossed");
            new_task_text.classList.remove("taskTextNormal");
            new_task_finish.style.backgroundColor = "#6DA34D";
            new_task_buttons_edit.style.display = "none";
        }
        else{
            new_task_text.style.textDecorationLine = "";
            new_task_text.classList.add("taskTextNormal");
            new_task_text.classList.remove("taskTextCrossed");
            new_task_finish.style.backgroundColor = "#F2AF29";
            new_task_buttons_edit.style.display = "block";
        }
    })
    
    // Editing the task
    new_task_buttons_edit.addEventListener('click', () => {
        if (new_task_text.getAttribute("readOnly") != null){
            new_task_text.removeAttribute("readOnly");
            new_task_text.placeholder = "";
            new_task_text.focus();
            new_task_buttons_edit.innerText = "Save";
        }
        else{
            const new_task = new_task_text.value;
            new_task_text.setAttribute("readonly", "readOnly");
            new_task_text.placeholder = new_task;
            new_task_buttons_edit.innerText = "Edit";
            sessionStorage.setItem(ID, new_task);
        }
    })

    if (isNew){
        sessionStorage.setItem(ID, taskName);
    }
    // Delete button
    new_task_buttons_delete.addEventListener('click', () => {
        sessionStorage.removeItem(ID);
        new_task.remove();
    })

    return new_task;
}

button.addEventListener('click', () => {

    const task_list_elements = task_list.children;
    const length = task_list_elements.length;

    if (length == 0 || task_list_elements[length - 1].className !== "taskForm"){
        const form = document.createElement("div");
        form.classList.add("taskForm");

        const input_field = document.createElement("input");
        input_field.type = "text";
        input_field.classList.add("inputTask");
        input_field.placeholder = "Enter the task";

        form.appendChild(input_field);

        task_list.appendChild(form);

        input_field.focus();
    }
    
    else{
        const form = task_list_elements[length - 1];
        const input = form.children[0];
        const task_text = input.value;

        if (task_text == ""){
            alert("Enter task first!");
            return;
        }
        form.remove();

        // Adding new task to our tasklist and session storage
        const ID = new Date().getTime().toString();
        const new_task = createNewTask(task_text, true, ID);
        task_list.appendChild(new_task);
    }
})

function checkSubstring(str1, str2){
    var size = 0;
    if (str1.length > str2.length){
        size = str2.length;
    }
    else{
        size = str1.length;
    }

    for (var i = 0; i < size; i ++){
        if (str1[i] != str2[i]){
            return false;
        }
    }
    return true;
}

input.addEventListener('input', () => {
    task_list.innerHTML = "";
    const search_text = input.value;
    for (var i = 0; i < sessionStorage.length; i ++){
        const key = sessionStorage.key(i);
        const taskName = sessionStorage.getItem(key);
        
        if (checkSubstring(search_text, taskName)){
            const new_task = createNewTask(taskName, false, key);
            task_list.appendChild(new_task);   
        }
    }
});

window.addEventListener('load', () => {
    sessionStorage.removeItem("IsThisFirstTime_Log_From_LiveServer");
    for (var i = 0; i < sessionStorage.length; i ++){
        const key = sessionStorage.key(i);
        const taskName = sessionStorage.getItem(key);

        const new_task = createNewTask(taskName, false, key);
        task_list.appendChild(new_task);
    }
})
