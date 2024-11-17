document.addEventListener("DOMContentLoaded", loadTrash);

const trashList = document.getElementById("trashList");
const clearTrashButton = document.getElementById("clearTrashButton");

function loadTrash() {
    trashList.innerHTML = ""; 
    const trash = JSON.parse(localStorage.getItem("trash")) || [];
    trash.forEach(task => {
        const li = document.createElement("li");
        li.className = `task-item ${getPriorityClass(task.priority)}`;
        li.innerHTML = `
            <div class="task-info">
                <span><strong>${task.title}</strong> (${task.priority})</span>
                <span>${task.status}</span>
            </div>
            <p>${task.description}</p>
            <p>Inicio: ${task.startDate} | Vencimiento: ${task.dueDate}</p>
            <p>Etiquetas: ${task.tags || "Ninguna"}</p>
        `;
        trashList.appendChild(li);
    });
}


window.addEventListener("updateTrash", (event) => {
    if (event.data && event.data.type === "updateTrash") {
        loadTrash(); 
    }
});

clearTrashButton.addEventListener("click", clearTrash);

function clearTrash() {
    localStorage.removeItem("trash");
    loadTrash(); 
}

function getPriorityClass(priority) {
    switch (priority) {
        case "Baja":
            return "baja";
        case "Media":
            return "media";
        case "Alta":
            return "alta";
        default:
            return "";
    }
}
