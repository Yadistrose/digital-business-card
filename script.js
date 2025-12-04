/* =============================
   LOAD CARD DATA ON VIEW PAGE
==============================*/
function loadCard() {
    const fields = ["name", "title", "company", "bio", "location"];

    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = localStorage.getItem(id) || "";
    });

    const phone = localStorage.getItem("phone");
    const email = localStorage.getItem("email");
    const website = localStorage.getItem("website");

    if (phone) document.getElementById("callButton").href = `tel:${phone}`;
    if (email) document.getElementById("emailButton").href = `mailto:${email}`;
    if (website) document.getElementById("websiteButton").href = website;

    // Social Media Buttons
    setSocialLink("linkedin", "linkedinBtn");
    setSocialLink("instagram", "instagramBtn");
    setSocialLink("facebook", "facebookBtn");
    setSocialLink("tiktok", "tiktokBtn");

    // Load Profile Photo
    const photo = localStorage.getItem("photo");
    if (photo) {
        const img = document.getElementById("profilePhoto");
        if (img) img.src = photo;
    }
}

function setSocialLink(field, btnId) {
    const url = localStorage.getItem(field);
    const btn = document.getElementById(btnId);
    if (btn) {
        if (url) {
            btn.style.display = "inline-block";
            btn.href = url;
        } else {
            btn.style.display = "none";
        }
    }
}


/* =============================
   LOAD FORM DATA IN EDITOR
==============================*/
function loadForm() {
    const fields = [
        "name", "title", "company", "location", "bio",
        "phone", "email", "website",
        "linkedin", "instagram", "facebook", "tiktok"
    ];

    fields.forEach(id => {
        const input = document.getElementById(id + "Input");
        if (input) input.value = localStorage.getItem(id) || "";
    });
}


/* =============================
   SAVE CARD DATA
==============================*/
function saveCard() {
    const fields = [
        "name", "title", "company", "location", "bio",
        "phone", "email", "website",
        "linkedin", "instagram", "facebook", "tiktok"
    ];

    // Save text inputs
    fields.forEach(id => {
        const input = document.getElementById(id + "Input");
        if (input) localStorage.setItem(id, input.value);
    });

    // Save uploaded photo
    const fileInput = document.getElementById("photoFile");
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = e => {
            localStorage.setItem("photo", e.target.result);
            alert("Saved successfully!");
        };
        reader.readAsDataURL(file);
    } else {
        alert("Saved successfully!");
    }
}


/* =============================
   SHARE BUTTON
==============================*/
function shareCard() {
    const shareData = {
        title: localStorage.getItem("name") || "My Digital Business Card",
        text: "Check out my digital business card:",
        url: window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData).catch(console.error);
    } else {
        alert("Sharing not supported on this device.");
    }
}


/* =============================
   VCARD DOWNLOAD
==============================*/
function generateVCard() {
    const fields = {
        FN: localStorage.getItem("name"),
        TITLE: localStorage.getItem("title"),
        ORG: localStorage.getItem("company"),
        TEL: localStorage.getItem("phone"),
        EMAIL: localStorage.getItem("email"),
        URL: localStorage.getItem("website")
    };

    let vcard = "BEGIN:VCARD\nVERSION:3.0\n";
    for (const key in fields) {
        if (fields[key]) vcard += `${key}:${fields[key]}\n`;
    }
    vcard += "END:VCARD";

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "contact.vcf";
    a.click();
}


/* =============================
   INIT: Only run loadCard on index
==============================*/
if (!window.location.pathname.includes("edit")) {
    loadCard();
}
