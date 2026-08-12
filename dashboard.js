document.addEventListener("DOMContentLoaded", function () {

    const studyStatus = localStorage.getItem("studyStatus");

    if (studyStatus) {

        const statusElements = document.querySelectorAll(".status");

        statusElements.forEach(function (element) {
            element.textContent = studyStatus;
        });

    }

});