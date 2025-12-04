document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
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
        "category": "in-progress" 
    },
    {
        "id": "3",
        "title": "Task 3",
        "desc": "Code for devWeeLorem ipsum dolor sit amet consectetur adipisicin",
        "category": "in-progress" 
    },
    {
        "id": "4",
        "title": "Task 4",
        "desc": "Code for devWeeLorem ipsum dolor sit amet consectetur adipisicin",
        "category": "in-progress" 
    },
];

function loadTasks() {
    const tasks = document.querySelector(".tasks");
    for (let task of tasksData) {
        const div = document.createElement("div");

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

        const dragHandle = document.createElement("img")
        dragHandle.src = "assets/drag.png"
        dragHandleDiv.append(dragHandle)

        div.append(primary);
        div.append(dragHandleDiv);
        tasks.prepend(div);
    }
}