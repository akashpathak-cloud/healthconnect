function submitReport() {
    localStorage.setItem("studyStatus", "Reported");

    alert("Report submitted successfully.");

    window.location.href = "dashboard.html";
}

function saveDraft() {
    localStorage.setItem("studyStatus", "In Review");

    alert("Report saved as draft.");
}