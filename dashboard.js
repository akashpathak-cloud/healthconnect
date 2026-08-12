document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.querySelector(".search-box input");
    const statusFilter = document.querySelector(".search-box select:nth-of-type(1)");
    const modalityFilter = document.querySelector(".search-box select:nth-of-type(2)");
    const searchButton = document.querySelector(".search-box button");

    const rows = document.querySelectorAll("tbody tr");

    // Update John Doe status from localStorage
    const status = localStorage.getItem("studyStatus");
    const johnStatus = document.getElementById("john-status");

    if (status === "Reported" && johnStatus) {
        johnStatus.textContent = "Reported";
        johnStatus.className = "status reported-status";
    }

    function filterStudies() {

        const searchText = searchInput.value.toLowerCase().trim();
        const selectedStatus = statusFilter.value;
        const selectedModality = modalityFilter.value;

        rows.forEach(function (row) {

            const patient = row.children[1].textContent.toLowerCase();
            const mrn = row.children[2].textContent.toLowerCase();
            const study = row.children[3].textContent.toLowerCase();
            const modality = row.children[4].textContent.toLowerCase();

            const statusElement = row.querySelector(".status");
            const rowStatus = statusElement
                ? statusElement.textContent.trim().toLowerCase()
                : "";

            const matchesSearch =
                patient.includes(searchText) ||
                mrn.includes(searchText) ||
                study.includes(searchText);

            const matchesStatus =
                selectedStatus === "All Status" ||
                rowStatus === selectedStatus.toLowerCase();

            const matchesModality =
                selectedModality === "All Modalities" ||
                modality === selectedModality.toLowerCase();

            if (matchesSearch && matchesStatus && matchesModality) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    }

    searchButton.addEventListener("click", filterStudies);

    searchInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            filterStudies();
        }
    });

    statusFilter.addEventListener("change", filterStudies);
    modalityFilter.addEventListener("change", filterStudies);

});