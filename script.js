// Load data into public card
function loadCard() {
    const simpleFields = ["name", "title", "company", "bio", "location"];
    simpleFields.forEach(field => {
        const data = localStorage.getItem(field);
        const el = document.getElementById(field);
        if (el) el.textContent = data || "";
    });

    // Photo
    const photoData = localStorage.getItem("photo");
    const photoEl = document.getElementById("profilePhoto");
    if (photoEl && photoData) {
        photoEl.src = photoData;
    } else if (photoEl) {
        photoEl.src = "";
    }

    // Contact buttons
    const phone = localStorage.getItem("phone");
    const email = localStorage.getItem("email");
    const web   = localStorage.getItem("website");

    const callBtn = document.getElementById("callButton");
    const emailBtn = document.getElementById("emailButton");
    const webBtn = document.getElementById("websiteButton");

    if (callBtn) {
        if (phone) { callBtn.href = `tel:${phone}`; callBtn.style.display = "block"; }
        else callBtn.style.display = "none";
    }
    if (emailBtn) {
        if (email) { emailBtn.href = `mailto:${email}`; emailBtn.style.display = "block"; }
        else emailBtn.style.display = "none";
    }
    if (webBtn) {
        if (web) { webBtn.href = web; webBtn.style.display = "block"; }
        else webBtn.style.display = "none";
    }

    // Socials
    setSocial("linkedin", "linkedinBtn");
    setSocial("instagram", "instagramBtn");
    setSocial("facebook", "facebookBtn");
    setSocial("tiktok", "tiktokBtn");
}

function setSocial(field, btnId) {
    const url = localStorage.getItem(field);
    const btn = document.getElementById(btnId);
    if (!btn) return;
    if (url) {
        btn.href = url;
        btn.style.display = "inline-flex";
    } else {
        btn.style.display = "none";
    }
}

// Load data into editor form
function loadForm() {
    const ids = [
        "name", "title", "company", "bio", "phone",
        "email", "website", "location",
        "linkedin", "instagram", "facebook", "tiktok"
    ];
    ids.forEach(id => {
        const input = document.getElementById(id + "Input");
        if (input) input.value = localStorage.getItem(id) || "";
    });
}

// Save from editor form into localStorage
function saveCard() {
    const ids = [
        "name", "title", "company", "bio", "phone",
        "email", "website", "location",
        "linkedin", "instagram", "facebook", "tiktok"
    ];
    ids.forEach(id => {
        const input = document.getElementById(id + "Input");
        if (input) localStorage.setItem(id, input.value);
    });

    const fileInput = document.getElementById("photoFile");
    const file = fileInput && fileInput.files ? fileInput.files[0] : null;

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            localStorage.setItem("photo", e.target.result);
            alert("Saved! Open or refresh your public card page.");
        };
        reader.readAsDataURL(file);
    } else {
        alert("Saved! Open or refresh your public card page.");
    }
}

// Generate and download a vCard
function generateVCard() {
    const name = localStorage.getItem("name") || "";
    const title = localStorage.getItem("title") || "";
    const company = localStorage.getItem("company") || "";
    const phone = localStorage.getItem("phone") || "";
    const email = localStorage.getItem("email") || "";
    const website = localStorage.getItem("website") || "";

    const vcard =
        "BEGIN:VCARD\n" +
        "VERSION:3.0\n" +
        `FN:${name}\n` +
        (company ? `ORG:${company}\n` : "") +
        (title ? `TITLE:${title}\n` : "") +
        (phone ? `TEL;TYPE=CELL:${phone}\n` : "") +
        (email ? `EMAIL:${email}\n` : "") +
        (website ? `URL:${website}\n` : "") +
        "END:VCARD\n";

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = (name || "contact") + ".vcf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Decide which mode to load
if (window.location.pathname.toLowerCase().includes("edit.html")) {
    // editor is unlocked from inline script in edit.html
} else {
    loadCard();
}
