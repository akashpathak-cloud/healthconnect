document.addEventListener("DOMContentLoaded", function () {

    // ==============================
    // STATUS UPDATE
    // ==============================

    const status = localStorage.getItem("studyStatus");
    const johnStatus = document.getElementById("john-status");

    if (status === "Reported" && johnStatus) {
        johnStatus.textContent = "Reported";
        johnStatus.className = "status reported-status";
    }


    // ==============================
    // SEARCH + FILTER
    // ==============================

    const searchInput = document.querySelector('input[type="text"]');
    const selects = document.querySelectorAll("select");
    const searchButton = Array.from(document.querySelectorAll("button"))
        .find(button => button.textContent.trim() === "Search");

    const statusFilter = selects[0];
    const modalityFilter = selects[1];

    const rows = document.querySelectorAll("tbody tr");


    function filterStudies() {

        const searchText = searchInput.value.toLowerCase().trim();

        const selectedStatus = statusFilter.value
            .toLowerCase()
            .trim();

        const selectedModality = modalityFilter.value
            .toLowerCase()
            .trim();


        rows.forEach(function (row) {

            const cells = row.querySelectorAll("td");

            if (cells.length < 5) {
                return;
            }

            // Columns
            const patient = cells[1].textContent.toLowerCase().trim();
            const mrn = cells[2].textContent.toLowerCase().trim();
            const study = cells[3].textContent.toLowerCase().trim();
            const modality = cells[4].textContent.toLowerCase().trim();

            const statusElement = row.querySelector(".status");

            const rowStatus = statusElement
                ? statusElement.textContent.toLowerCase().trim()
                : "";


            // Search can match Patient, MRN or Study
            const matchesSearch =
                searchText === "" ||
                patient.includes(searchText) ||
                mrn.includes(searchText) ||
                study.includes(searchText);


            // Status filter
            const matchesStatus =
                selectedStatus === "all status" ||
                rowStatus === selectedStatus;


            // Modality filter
            const matchesModality =
                selectedModality === "all modalities" ||
                modality === selectedModality;


            // Show / hide row
            if (
                matchesSearch &&
                matchesStatus &&
                matchesModality
            ) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }

        });
    }


    // Search button
    if (searchButton) {
        searchButton.addEventListener("click", filterStudies);
    }


    // Press Enter in search box
    if (searchInput) {
        searchInput.addEventListener("keyup", function (event) {

            if (event.key === "Enter") {
                filterStudies();
            }

        });
    }


    // Status dropdown
    if (statusFilter) {
        statusFilter.addEventListener("change", filterStudies);
    }


    // Modality dropdown
    if (modalityFilter) {
        modalityFilter.addEventListener("change", filterStudies);
    }

});