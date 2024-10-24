const eventsContainer = document.querySelector("#events-container");
const finishedEventsContainer = document.querySelector(
  "#finished-events-container"
);
const newEventBtn = document.querySelector("#new-event-btn");
const modal = document.querySelector("#modal");
const taskDescInput = document.querySelector("#task-desc");
const taskStartTimeInput = document.querySelector("#start-time");
const taskEndTimeInput = document.querySelector("#end-time");
const saveTaskBtn = document.querySelector("#save-task");

const colorCircle = document.querySelector("#color-circle");
const colorOptionsContainer = document.querySelector("#color-options");
let selectedColor = "#D0CBFF";

colorCircle.addEventListener("click", () => {
  colorOptionsContainer.style.display =
    colorOptionsContainer.style.display === "flex" ? "none" : "flex";
});

document.querySelectorAll(".color-option").forEach((option) => {
  option.addEventListener("click", (e) => {
    selectedColor = e.target.getAttribute("data-color");
    colorCircle.style.backgroundColor = selectedColor;
    colorOptionsContainer.style.display = "none";
  });
});

let tasks = [];

function renderTasks() {
  eventsContainer.innerHTML = "";
  finishedEventsContainer.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("event-card");
    taskElement.style.backgroundColor = task.color || "#D0CBFF";

    if (task.checked) {
      taskElement.classList.add("checked");
    }

    taskElement.innerHTML = `
      <div class="delete-cross" onclick="deleteTask(${index})">✕</div> 
      <div class="event-details">
        <span class="event-time">${task.startTime} - ${task.endTime}</span>
        <span class="event-description">${task.description}</span> 
        <div class="cross-container">
          <div class="event-cross" onclick="toggleCheckOff(${index})"></div> 
        </div>
      </div>
    `;

    if (!task.checked) {
      eventsContainer.appendChild(taskElement);
    } else {
      finishedEventsContainer.appendChild(taskElement);
    }
  });
}

saveTaskBtn.addEventListener("click", () => {
  const taskDescription = taskDescInput.value.trim();
  const taskStartTime = taskStartTimeInput.value.trim();
  const taskEndTime = taskEndTimeInput.value.trim();

  if (taskDescription && taskStartTime && taskEndTime) {
    const newTask = {
      id: crypto.randomUUID(),
      description: taskDescription,
      startTime: taskStartTime,
      endTime: taskEndTime,
      color: selectedColor,
      checked: false,
    };

    tasks.push(newTask);

    modal.style.display = "none";
    taskDescInput.value = "";
    taskStartTimeInput.value = "";
    taskEndTimeInput.value = "";

    selectedColor = "#D0CBFF";
    colorCircle.style.backgroundColor = selectedColor;

    renderTasks();
  } else {
    alert("Udfyld venligst alle felter!");
  }
});

newEventBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

function toggleCheckOff(index) {
  tasks[index].checked = !tasks[index].checked;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

document.addEventListener("DOMContentLoaded", function () {
  renderTasks();
});

const uniqueId = crypto.randomUUID();
console.log(uniqueId);
