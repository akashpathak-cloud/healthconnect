document.addEventListener("DOMContentLoaded", function () {

    const savedStatus = localStorage.getItem("studyStatus");

    const johnStatus = document.getElementById("john-status");

    if (savedStatus && johnStatus) {
        johnStatus.textContent = savedStatus;

        // Change the visual status class
        johnStatus.classList.remove(
            "unread-status",
            "review-status",
            "reported-status"
        );

        if (savedStatus === "Reported") {
            johnStatus.classList.add("reported-status");
        } else if (savedStatus === "In Review") {
            johnStatus.classList.add("review-status");
        } else {
            johnStatus.classList.add("unread-status");
        }
    }

});