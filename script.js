// Save tasks array to localStorage so data persists between page reloads
function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Read the current list of tasks from the DOM and return as an array of objects
function getCurrentTasks() {
  const taskList = document.getElementById('taskList');
  const tasks = [];
  for (const li of taskList.children) {
    const span = li.querySelector('span');
    if (span) {
      tasks.push({
        text: span.textContent,
        done: li.classList.contains('done') // track whether task is marked as completed
      });
    }
  }
  return tasks;
}

// Replace a task's text with an input box for editing, then save it
function updateTask(li, span) {
  const oldText = span.textContent;

  // Create a text input to allow editing
  const input = document.createElement('input');
  input.type = 'text';
  input.value = oldText;
  input.size = Math.max(10, oldText.length); // adjust size based on text length

  // Create a save button to confirm the edit
  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Save';

  // When save is clicked, update the task and re-render the span
  saveBtn.onclick = () => {
    span.textContent = input.value.trim() || oldText; // if empty, keep old text
    li.replaceChild(span, input); // swap back to span
    li.removeChild(saveBtn); // remove save button
    saveTasks(getCurrentTasks()); // update localStorage
  };

  li.replaceChild(input, span);
  li.appendChild(saveBtn);
  input.focus(); // auto-focus for user convenience
}

// On page load, load all saved tasks from localStorage and render them
window.onload = function() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

  console.log('All tasks on load:', savedTasks.map(t => t.text)); // Debug log

  const taskList = document.getElementById('taskList');
  taskList.innerHTML = ''; // Clear current list before rendering

  savedTasks.forEach(task => {
    const li = document.createElement('li');
    if (task.done) li.classList.add('done'); // visually mark completed tasks

    const span = document.createElement('span');
    span.textContent = task.text;

    // Toggle done status on click
    span.onclick = () => {
      console.log('Task:', span.textContent); // Debug log
      li.classList.toggle('done');
      saveTasks(getCurrentTasks()); // Save the change
    };

    // Delete task button
    const delBtn = document.createElement('button');
    delBtn.textContent = '❌';
    delBtn.onclick = () => {
      li.remove();
      saveTasks(getCurrentTasks());
    };

    // Edit task button
    const editBtn = document.createElement('button');
    editBtn.textContent = '✏️';
    editBtn.onclick = () => updateTask(li, span);

    // Add task components to the list item
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(delBtn);

    // Append the list item to the task list
    taskList.appendChild(li);
  });
};

// Add a new task when "Add" button is clicked
function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  // Do nothing if input is empty
  if (taskText === "") return;

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = taskText;

  // Toggle done status on click
  span.onclick = () => {
    console.log('Task:', span.textContent); // Debug log
    li.classList.toggle('done');
    saveTasks(getCurrentTasks());
  };

  // Create and assign functionality to edit button
  const editBtn = document.createElement("button");
  editBtn.textContent = '✏️';
  editBtn.onclick = () => updateTask(li, span);

  // Create and assign functionality to delete button
  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.onclick = () => {
    li.remove();
    saveTasks(getCurrentTasks());
  };

  // Append span and buttons to the task item
  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(delBtn);

  // Add the new task to the list
  document.getElementById("taskList").appendChild(li);

  // Clear the input field
  input.value = "";

  // Save updated task list to localStorage
  saveTasks(getCurrentTasks());
}
