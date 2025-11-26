function loadCard() {
    const fields = ["name", "title", "company", "bio", "phone", "email", "website", "photo"];
    fields.forEach(field => {
        const data = localStorage.getItem(field);
        const el = document.getElementById(field === "photo" ? "profilePhoto" : field);
        if (el && data) {
            if (field === "photo") el.src = data;
            else el.textContent = data;
        }
    });

    // Buttons
    const phone = localStorage.getItem("phone");
    const email = localStorage.getItem("email");
    const web = localStorage.getItem("website");

    document.getElementById("callButton").href = phone ? `tel:${phone}` : "#";
    document.getElementById("emailButton").href = email ? `mailto:${email}` : "#";
    document.getElementById("websiteButton").href = web ? web : "#";
}

function loadForm() {
    const ids = ["name", "title", "company", "bio", "phone", "email", "website"];
    ids.forEach(id => {
        document.getElementById(id + "Input").value = localStorage.getItem(id) || "";
    });
}

function saveCard() {
    const ids = ["name", "title", "company", "bio", "phone", "email", "website"];
    ids.forEach(id => {
        localStorage.setItem(id, document.getElementById(id + "Input").value);
    });

    const file = document.getElementById("photoFile").files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            localStorage.setItem("photo", e.target.result);
            alert("Saved! Refresh your card page.");
        };
        reader.readAsDataURL(file);
    } else {
        alert("Saved! Refresh your card page.");
    }
}

if (location.pathname.includes("edit.html")) loadForm();
else loadCard();
