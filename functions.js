window.addEventListener('load', () => {
    const task_list = document.getElementById("tasks");
    const button = document.getElementById("addTask");

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
            new_task_text.placeholder = task_text;

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

            // Appending final child
            form.remove();

            task_list.appendChild(new_task)
            
            
            new_task_finish.addEventListener('click', () => {
                if (new_task_text.classList.length == 1){
                    new_task_finish.style.backgroundColor = "#6DA34D";
                    new_task_text.classList.add("taskTextCrossed");
                }
                else{
                    new_task_finish.style.backgroundColor = "#F2AF29";
                    new_task_text.classList.remove("taskTextCrossed");
                }
            })



            /*const new_task_button = document.createElement("button");
            new_task_button.classList.add("taskFinish");


            const new_task_p = document.createElement("p");
            new_task_p.innerText = task_text;

            new_task_button.addEventListener('click', () => {
                new_task_button.style.backgroundColor = "#6DA34D";
                new_task_p.style.textDecorationLine = "line-through";
            })

            new_task.appendChild(new_task_button);
            new_task.appendChild(new_task_p);

            form.remove();

            task_list.appendChild(new_task); */
        }
        /*
        
        */
    })
})
