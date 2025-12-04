window.onload = () => {
    lS = localStorage.getItem("tasksData");
    if (!lS) {
        localStorage.setItem("tasksData", "[]");
        localStorage.setItem("currId", "0");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    document.querySelector(".add-task>button").addEventListener("click", (e) => {
        e.preventDefault();
        addTask();
    })
});


// tasksData
function loadTasks() {
    let tasksData = JSON.parse(localStorage.getItem("tasksData"));
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

        deleteButton.addEventListener("click", (e) => {
            e.preventDefault();
            tasksData = JSON.parse(localStorage.getItem("tasksData"));
            tasksData = tasksData.filter(data => data.id != task.id);
            localStorage.setItem("tasksData", JSON.stringify(tasksData));
            refreshTasks();
        })

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
    let tasksData = JSON.parse(localStorage.getItem("tasksData"));
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    let target = ev.target;
    while (!target.classList.contains("tasks")) {
        target = target.parentNode;
    }
    tasksData = tasksData.map(item => {
        if (item.id == data)
            item.category = target.classList[1];
        return item;
    })
    localStorage.setItem("tasksData", JSON.stringify(tasksData));
    target.appendChild(document.getElementById(data));
}

function addTask () {
    let currId = localStorage.getItem("currId");
    let tasksData = JSON.parse(localStorage.getItem("tasksData"));
    const title = document.querySelector(".add-task>input").value;

    if (title.trim().length < 1)
        return

    document.querySelector(".add-task>input").value = ""

    const newEntry = {
        id: currId,
        title: title,
        desc: "",
        category: "to-do"
    }

    currId = String(+currId + 1);
    localStorage.setItem("currId", currId);

    tasksData.push(newEntry);
    localStorage.setItem("tasksData", JSON.stringify(tasksData));
    refreshTasks();
}

function refreshTasks () {
    let columns = document.querySelectorAll(".tasks");
    for (column of columns)
        column.innerHTML = ""
    loadTasks();
}