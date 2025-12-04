document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    // document.querySelector(".add-task>button").addEventListener("click", addTask)
});

let tasksData = [
    {
        "id": "1",
        "title": "Task 1",
        "desc": "Code for devWeeLorem ipsum dolor sit amet consectetur adipisicin",
        "category": "in-progress" 
    },
    {
        "id": "2",
        "title": "Task 2",
        "desc": "Code for devWeeLorem ipsum dolor sit amet consectetur adipisicin",
        "category": "done" 
    },
    {
        "id": "3",
        "title": "Task 3",
        "desc": "Code for devWeeLorem ipsum dolor sit amet consectetur adipisicin",
        "category": "to-do" 
    },
    {
        "id": "4",
        "title": "Task 4",
        "desc": "",
        "category": "to-do" 
    },
    {
        "id": "4",
        "title": "Task 4",
        "desc": "Code for devWeeLorem ipsum dolor sit amet consectetur adipisicin",
        "category": "to-do" 
    },
    {
        "id": "4",
        "title": "Task 4",
        "desc": "Code for devWeeLorem ipsum dolor sit amet consectetur adipisicin",
        "category": "to-do" 
    },
    {
        "id": "4",
        "title": "Task 4",
        "desc": "Code for devWeeLorem ipsum dolor sit amet consectetur adipisicin",
        "category": "to-do" 
    },
    {
        "id": "4",
        "title": "Task 4",
        "desc": "Code for devWeeLorem ipsum dolor sit amet consectetur adipisicin",
        "category": "to-do" 
    }
];

function loadTasks() {
    for (let task of tasksData) {
        const div = document.createElement("div");
        div.id = task.id;
        div.draggable = "true";
        div.ondragstart = (event) => {dragstartHandler(event)};


        const primary = document.createElement("div");
        primary.className = "primary";
        const dragHandleDiv = document.createElement("div");
        dragHandleDiv.className = "drag-handle";
        

        const title = document.createElement("h5");
        title.innerText = task.title;
        const desc = document.createElement("p");
        desc.innerText = task.desc
        primary.append(title);
        primary.append(desc);

        const interface = document.createElement("div");
        interface.className = "interface";
        const editButton = document.createElement("button");
        editButton.innerText = "Edit"
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete"
        interface.append(editButton);
        interface.append(deleteButton);

        primary.append(interface)

        div.append(primary);
        div.append(dragHandleDiv);

        if (task.category == "to-do")
            document.querySelector(".to-do").prepend(div);
        else if (task.category == "in-progress")
            document.querySelector(".in-progress").prepend(div);
        else if (task.category == "done")
            document.querySelector(".done").prepend(div);
    }
}

function dragstartHandler(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function dragoverHandler(ev) {
    ev.preventDefault();
}

function dropHandler(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    console.log(ev.target)
    let target = ev.target;
    while (!target.classList.contains("tasks")) {
        target = target.parentNode;
    }
    tasksData = tasksData.map(item => {
        if (item.id == data)
            item.category = target.classList[1];
        return item;
    })
    target.appendChild(document.getElementById(data));
}
