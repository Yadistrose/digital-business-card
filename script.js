function loadCard() {
    const fields = ["name", "title", "company", "phone", "email", "website", "bio", "photo"];
    fields.forEach(field => {
        const data = localStorage.getItem(field);
        const el = document.getElementById(field === "photo" ? "profilePhoto" : field);
        if (el && data) {
            if (field === "photo") el.src = data;
            else el.textContent = data;
        }
    });
}

function loadForm() {
    document.getElementById("nameInput").value = localStorage.getItem("name") || "";
    document.getElementById("titleInput").value = localStorage.getItem("title") || "";
    document.getElementById("companyInput").value = localStorage.getItem("company") || "";
    document.getElementById("phoneInput").value = localStorage.getItem("phone") || "";
    document.getElementById("emailInput").value = localStorage.getItem("email") || "";
    document.getElementById("websiteInput").value = localStorage.getItem("website") || "";
    document.getElementById("bioInput").value = localStorage.getItem("bio") || "";
    document.getElementById("photoInput").value = localStorage.getItem("photo") || "";
}

function saveCard() {
    localStorage.setItem("name", document.getElementById("nameInput").value);
    localStorage.setItem("title", document.getElementById("titleInput").value);
    localStorage.setItem("company", document.getElementById("companyInput").value);
    localStorage.setItem("phone", document.getElementById("phoneInput").value);
    localStorage.setItem("email", document.getElementById("emailInput").value);
    localStorage.setItem("website", document.getElementById("websiteInput").value);
    localStorage.setItem("bio", document.getElementById("bioInput").value);
    localStorage.setItem("photo", document.getElementById("photoInput").value);
    alert("Saved!");
}

if (window.location.pathname.includes("index.html")) {
    loadCard();
} else {
    loadForm();
}
