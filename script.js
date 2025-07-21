// Helper to save a given tasks array to localStorage
function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Helper to get current tasks from DOM as array of objects
function getCurrentTasks() {
  const taskList = document.getElementById('taskList');
  const tasks = [];
  for (const li of taskList.children) {
    const span = li.querySelector('span');
    if (span) {
      tasks.push({
        text: span.textContent,
        done: li.classList.contains('done')
      });
    }
  }
  return tasks;
}

// Helper to update a task in the DOM
function updateTask(li, span) {
  const oldText = span.textContent;
  const input = document.createElement('input');
  input.type = 'text';
  input.value = oldText;
  input.size = Math.max(10, oldText.length);
  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Save';
  saveBtn.onclick = () => {
    span.textContent = input.value.trim() || oldText;
    li.replaceChild(span, input);
    li.removeChild(saveBtn);
    saveTasks(getCurrentTasks());
  };
  li.replaceChild(input, span);
  li.appendChild(saveBtn);
  input.focus();
}

// Retrieve and render tasks from localStorage on page load
window.onload = function() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  console.log('All tasks on load:', savedTasks.map(t => t.text)); // Show all tasks in console
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  savedTasks.forEach(task => {
    const li = document.createElement('li');
    if (task.done) li.classList.add('done');
    const span = document.createElement('span');
    span.textContent = task.text;
    span.onclick = () => {
      console.log('Task:', span.textContent); // Show text in console
      li.classList.toggle('done');
      saveTasks(getCurrentTasks());
    };
    const delBtn = document.createElement('button');
    delBtn.textContent = '❌';
    delBtn.onclick = () => {
      li.remove();
      saveTasks(getCurrentTasks());
    };
    const editBtn = document.createElement('button');
    editBtn.textContent = '✏️';
    editBtn.onclick = () => updateTask(li, span);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
};
function  addTask() {
    const  input  =  document.getElementById("taskInput");
    const  taskText  =  input.value.trim();
    if (taskText  ===  "") return;

    const  li  =  document.createElement("li");

    const  span  = document.createElement("span");
    span.textContent  =  taskText;
    span.onclick = () => {
      console.log('Task:', span.textContent); // Show text in console
      li.classList.toggle('done');
      saveTasks(getCurrentTasks());
    };

    const  editBtn = document.createElement("button");
    editBtn.textContent = '✏️';
    editBtn.onclick = () => updateTask(li, span);

    const  delBtn  = document.createElement("button");
    delBtn.textContent  =  "❌";
    delBtn.onclick = () => {
      li.remove();
      saveTasks(getCurrentTasks());
    };

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(delBtn);

    document.getElementById("taskList").appendChild(li);
    input.value  =  "";
    saveTasks(getCurrentTasks());
}