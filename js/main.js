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
 * array containing attachments. used by function which task is to change the
 * notification counter value.
 */
let attachmentsArray;

/**
 * function forms an array for notification counter's value changing function.
 */
function getAttachmentsArray() {
    let messageAttachments = document.getElementsByClassName("message-attachment");
    attachmentsArray = [...messageAttachments[0].getElementsByTagName("div")];
}

/**
 * function's task is to change the number of notifications according to the index of the image clicked
 * in the preliminarily formed array.
 *
 * @param object - object containing counter which is changeable by this function.
 */
function changeNotificationsCounter(object) {

    for (let i = 0; i < attachmentsArray.length; i++) {
        if (object === attachmentsArray[i]) {
            document.getElementById("notification-counter").textContent = i.toString();
            break;
        }
    }
}

/**
 * Event listener which task is to disable effects applied when sliding menu is shown,
 * if window width or ratio is back to numbers when sliding menu function is disabled.
 */
window.addEventListener('resize', function(){
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    if ((windowWidth > 981) ||
        ((windowWidth / windowHeight) > (17 / 16))) {
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