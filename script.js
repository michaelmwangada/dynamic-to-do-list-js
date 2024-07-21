document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    function addTask(taskText, save = true) {
        if (taskText.trim() === "") { // Check if the task input is empty
            alert("Please enter a task."); // Alert the user if the task input is empty
            return; // Exit the function if the task input is empty
        }

        // Create a new list item (li) element
        const listItem = document.createElement('li');
        listItem.textContent = taskText; // Set the text content of the list item to the task input value

        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove'; // Set the text content of the remove button to "Remove"
        removeButton.className = 'remove-btn'; // Set the class name of the remove button to "remove-btn"

        // Add event listener to the remove button to remove the task when clicked
        removeButton.addEventListener('click', function() {
            taskList.removeChild(listItem); // Remove the list item from the task list
            removeTaskFromStorage(taskText); // Remove the task from Local Storage
        });

        // Append the remove button to the list item
        listItem.appendChild(removeButton);
        // Append the list item to the task list
        taskList.appendChild(listItem);

        // Clear the task input field
        taskInput.value = '';

        if (save) {
            saveTaskToStorage(taskText); // Save the task to Local Storage
        }
    }

    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Add event listener to the add button to call addTask when clicked
    addButton.addEventListener('click', function() {
        addTask(taskInput.value);
    });

    // Add event listener to the task input field to call addTask when the "Enter" key is pressed
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') { // Check if the pressed key is "Enter"
            addTask(taskInput.value); // Call the addTask function
        }
    });

    // Load tasks from Local Storage when the page loads
    loadTasks();
});