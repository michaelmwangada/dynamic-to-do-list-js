document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function addTask() {
        const taskText = taskInput.value.trim(); // Retrieve and trim the task input value
        if (taskText === "") { // Check if the task input is empty
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
        });

        // Append the remove button to the list item
        listItem.appendChild(removeButton);
        // Append the list item to the task list
        taskList.appendChild(listItem);

        // Clear the task input field
        taskInput.value = '';
    }

    // Add event listener to the add button to call addTask when clicked
    addButton.addEventListener('click', addTask);

    // Add event listener to the task input field to call addTask when the "Enter" key is pressed
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') { // Check if the pressed key is "Enter"
            addTask(); // Call the addTask function
        }
    });
});
