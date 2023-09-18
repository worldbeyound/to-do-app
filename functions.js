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

            const new_task = document.createElement("div");
            new_task.classList.add("task");

            const new_task_button = document.createElement("button");
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

            task_list.appendChild(new_task);
        }
        /*
        
        */
    })
})
