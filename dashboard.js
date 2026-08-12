document.addEventListener("DOMContentLoaded", function () {

    // =========================================================
    // STUDY DATA
    // =========================================================

    const studies = [

        {
            priority: "STAT",
            patient: "John Doe",
            mrn: "MRN10245",
            study: "CT Brain",
            modality: "CT",
            date: "12 Aug 09:32",
            status: "Unread",
            radiologist: "Dr. Sharma"
        },

        {
            priority: "Urgent",
            patient: "Rahul Sharma",
            mrn: "MRN10246",
            study: "MRI Knee",
            modality: "MRI",
            date: "12 Aug 08:45",
            status: "In Review",
            radiologist: "Dr. Sharma"
        },

        {
            priority: "Normal",
            patient: "Maria Garcia",
            mrn: "MRN10247",
            study: "Chest X-Ray",
            modality: "X-Ray",
            date: "12 Aug 08:15",
            status: "Reported",
            radiologist: "Dr. Patel"
        },

        {
            priority: "Urgent",
            patient: "Priya Verma",
            mrn: "MRN10248",
            study: "CT Abdomen",
            modality: "CT",
            date: "12 Aug 07:58",
            status: "Unread",
            radiologist: "Dr. Sharma"
        },

        {
            priority: "Normal",
            patient: "Amit Kumar",
            mrn: "MRN10249",
            study: "MRI Brain",
            modality: "MRI",
            date: "12 Aug 07:42",
            status: "In Review",
            radiologist: "Dr. Patel"
        },

        {
            priority: "STAT",
            patient: "Sneha Kapoor",
            mrn: "MRN10250",
            study: "CT Chest",
            modality: "CT",
            date: "12 Aug 07:20",
            status: "Reported",
            radiologist: "Dr. Sharma"
        },

        {
            priority: "Normal",
            patient: "Ravi Mehta",
            mrn: "MRN10251",
            study: "Ultrasound Abdomen",
            modality: "Ultrasound",
            date: "12 Aug 06:55",
            status: "Reported",
            radiologist: "Dr. Patel"
        },

        {
            priority: "Urgent",
            patient: "Neha Singh",
            mrn: "MRN10252",
            study: "MRI Spine",
            modality: "MRI",
            date: "12 Aug 06:30",
            status: "In Review",
            radiologist: "Dr. Sharma"
        },

        {
            priority: "Normal",
            patient: "Vikram Shah",
            mrn: "MRN10253",
            study: "Chest X-Ray",
            modality: "X-Ray",
            date: "12 Aug 06:10",
            status: "Reported",
            radiologist: "Dr. Patel"
        },

        {
            priority: "Urgent",
            patient: "Anita Rao",
            mrn: "MRN10254",
            study: "CT Head",
            modality: "CT",
            date: "12 Aug 05:45",
            status: "Unread",
            radiologist: "Dr. Sharma"
        },

        {
            priority: "Normal",
            patient: "Suresh Kumar",
            mrn: "MRN10255",
            study: "MRI Shoulder",
            modality: "MRI",
            date: "12 Aug 05:20",
            status: "Reported",
            radiologist: "Dr. Patel"
        },

        {
            priority: "Normal",
            patient: "Kavita Joshi",
            mrn: "MRN10256",
            study: "CT Abdomen",
            modality: "CT",
            date: "12 Aug 04:55",
            status: "Unread",
            radiologist: "Dr. Sharma"
        }

    ];


    // =========================================================
    // PAGINATION
    // =========================================================

    const studiesPerPage = 10;

    let currentPage = 1;

    let filteredStudies = [...studies];


    // =========================================================
    // LOAD SAVED REPORT STATUS
    // =========================================================

    function loadSavedStatus() {

        const savedStatus =
            localStorage.getItem("studyStatus");

        if (savedStatus) {

            const johnStudy = studies.find(
                study => study.mrn === "MRN10245"
            );

            if (johnStudy) {
                johnStudy.status = savedStatus;
            }

        }

    }


    // =========================================================
    // SUMMARY COUNTS
    // =========================================================

    function updateSummaryCounts() {

        const unread =
            studies.filter(
                study => study.status === "Unread"
            ).length;

        const inReview =
            studies.filter(
                study => study.status === "In Review"
            ).length;

        const reported =
            studies.filter(
                study => study.status === "Reported"
            ).length;

        const stat =
            studies.filter(
                study => study.priority === "STAT"
            ).length;


        document.getElementById("totalCount").textContent =
            studies.length;

        document.getElementById("unreadCount").textContent =
            unread;

        document.getElementById("reviewCount").textContent =
            inReview;

        document.getElementById("reportedCount").textContent =
            reported;

        document.getElementById("statCount").textContent =
            stat;

    }


    // =========================================================
    // STATUS CLASS
    // =========================================================

    function getStatusClass(status) {

        switch (status) {

            case "Unread":
                return "unread-status";

            case "In Review":
                return "review-status";

            case "Reported":
                return "reported-status";

            default:
                return "";

        }

    }


    // =========================================================
    // PRIORITY CLASS
    // =========================================================

    function getPriorityClass(priority) {

        switch (priority) {

            case "STAT":
                return "stat";

            case "Urgent":
                return "urgent";

            default:
                return "normal";

        }

    }


    // =========================================================
    // RENDER STUDIES
    // =========================================================

    function renderStudies() {

        const tableBody =
            document.getElementById("studyTableBody");

        tableBody.innerHTML = "";


        const totalPages =
            Math.max(
                1,
                Math.ceil(
                    filteredStudies.length /
                    studiesPerPage
                )
            );


        if (currentPage > totalPages) {
            currentPage = totalPages;
        }


        const startIndex =
            (currentPage - 1) *
            studiesPerPage;

        const endIndex =
            startIndex +
            studiesPerPage;


        const pageStudies =
            filteredStudies.slice(
                startIndex,
                endIndex
            );


        // No results

        if (pageStudies.length === 0) {

            const row =
                document.createElement("tr");

            row.innerHTML = `
                <td colspan="9" class="no-results">
                    No studies found
                </td>
            `;

            tableBody.appendChild(row);

        }


        // Render rows

        pageStudies.forEach(study => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    <span class="priority ${getPriorityClass(study.priority)}">
                        ${study.priority}
                    </span>
                </td>

                <td>
                    ${study.patient}
                </td>

                <td>
                    ${study.mrn}
                </td>

                <td>
                    ${study.study}
                </td>

                <td>
                    ${study.modality}
                </td>

                <td>
                    ${study.date}
                </td>

                <td>
                    <span class="status ${getStatusClass(study.status)}">
                        ${study.status}
                    </span>
                </td>

                <td>
                    ${study.radiologist}
                </td>

                <td>
                    <button
                        class="view-btn"
                        onclick="openStudy('${study.mrn}')"
                    >
                        Open
                    </button>
                </td>

            `;


            tableBody.appendChild(row);

        });


        // Pagination information

        document.getElementById("pageInfo").textContent =
            `Page ${currentPage} of ${totalPages}`;


        document.getElementById("previousBtn").disabled =
            currentPage === 1;


        document.getElementById("nextBtn").disabled =
            currentPage === totalPages;


        // Study count

        document.getElementById("studyCount").textContent =
            `${filteredStudies.length} ${
                filteredStudies.length === 1
                    ? "study"
                    : "studies"
            }`;

    }


    // =========================================================
    // SEARCH + FILTER
    // =========================================================

    window.applyFilters = function () {

        const searchText =
            document
                .getElementById("searchInput")
                .value
                .trim()
                .toLowerCase();


        const selectedStatus =
            document
                .getElementById("statusFilter")
                .value;


        const selectedModality =
            document
                .getElementById("modalityFilter")
                .value;


        filteredStudies =
            studies.filter(study => {

                const matchesSearch =
                    searchText === "" ||

                    study.patient
                        .toLowerCase()
                        .includes(searchText) ||

                    study.mrn
                        .toLowerCase()
                        .includes(searchText) ||

                    study.study
                        .toLowerCase()
                        .includes(searchText);


                const matchesStatus =
                    selectedStatus === "all" ||
                    study.status === selectedStatus;


                const matchesModality =
                    selectedModality === "all" ||
                    study.modality === selectedModality;


                return (
                    matchesSearch &&
                    matchesStatus &&
                    matchesModality
                );

            });


        // Filters always start from page 1

        currentPage = 1;

        renderStudies();

    };


    // =========================================================
    // NEXT PAGE
    // =========================================================

    window.nextPage = function () {

        const totalPages =
            Math.ceil(
                filteredStudies.length /
                studiesPerPage
            );


        if (currentPage < totalPages) {

            currentPage++;

            renderStudies();

        }

    };


    // =========================================================
    // PREVIOUS PAGE
    // =========================================================

    window.previousPage = function () {

        if (currentPage > 1) {

            currentPage--;

            renderStudies();

        }

    };


    // =========================================================
    // OPEN STUDY
    // =========================================================

    window.openStudy = function (mrn) {

        /*
         * For Version 2, study.html is our
         * study/reporting screen.
         *
         * Later we will pass the actual
         * study ID to a backend/API.
         */

        window.location.href =
            "study.html";

    };


    // =========================================================
    // LOGOUT
    // =========================================================

    window.logout = function () {

        window.location.href =
            "login.html";

    };


    // =========================================================
    // ENTER KEY SEARCH
    // =========================================================

    document
        .getElementById("searchInput")
        .addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    window.applyFilters();

                }

            }
        );


    // =========================================================
    // INITIALIZE
    // =========================================================

    loadSavedStatus();

    updateSummaryCounts();

    renderStudies();

});