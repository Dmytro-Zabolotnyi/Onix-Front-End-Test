'use strict';

/**
 * function's task is to process clicks on completed tasks. function checks if there are any tasks available
 * to complete and if there are any, asks user if he really wants to mark task as completed.
 * function gives a message if there are no open tasks to mark as completed.
 */
function changeTasksCounter() {
    let openTasksNumber = document.getElementById("open-number");

    if (openTasksNumber.textContent > 0) {
        if (confirm("Are you sure you want to change the number of tasks?")) {
            let completedTasksNumber = document.getElementById("completed-number");
            let newOpen = parseInt(openTasksNumber.textContent) - 1;
            let newCompleted = parseInt(completedTasksNumber.textContent) + 1;
            openTasksNumber.textContent = newOpen + '';
            completedTasksNumber.textContent = newCompleted + '';
        }
    }
}

/**
 * function forms an array that contains attachments and adds an onclick function for each of them,
 * which changes the number of notifications according to the index of the image clicked
 * in the preliminarily formed array.
 */
function changeNotificationsCounter() {
    let attachmentsArray = [...document.getElementsByClassName("attachment")];

    for (let i = 0; i < attachmentsArray.length; i++) {
        attachmentsArray[i].onclick = function () {
            document.getElementById("notification-counter").textContent = i.toString();
        };
    }
}

/**
 * Event listener which task is to disable effects applied when sliding menu is shown,
 * if window width or ratio is back to numbers when sliding menu function is disabled.
 */
window.addEventListener('resize', function(){
    if ((window.innerWidth / window.innerHeight) > (980/927)) {
        document.getElementById("slide-menu-button").checked = false;
    }
});

/**
 * Event listener which task is to close sliding menu when clicked outside it.
 */
document.getElementById('right-column').addEventListener('click', function () {
    if (document.getElementById('slide-menu-button').checked === true) {
        document.getElementById("slide-menu-button").checked = false;
    }
});