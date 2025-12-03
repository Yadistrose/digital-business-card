<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Edit Card (Private)</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>
body { background:#020617; color:white; font-family:Arial; padding:20px; }

input,textarea {
    width:100%; padding:11px; margin:8px 0;
    border-radius:8px; background:#020617; color:#E5E7EB;
    border:1px solid #1f2937;
}
textarea { min-height:70px; }

button {
    background:#1E3A8A; color:white; padding:12px;
    width:100%; border-radius:8px; margin-top:15px;
}

/* Password lock */
#lockScreen {
    position:fixed; top:0; left:0; width:100%; height:100%;
    background:#020617; display:flex; flex-direction:column;
    justify-content:center; align-items:center; text-align:center;
}
#unlockInput {
    padding:12px; width:70%; max-width:250px; border-radius:999px;
    border:none; text-align:center;
}
</style>
</head>

<body>

<div id="lockScreen">
    <h2>Private Editor</h2>
    <input id="unlockInput" type="password" placeholder="Access Code">
    <button onclick="unlock()">Unlock</button>
</div>

<div id="editor" style="display:none;">
    <h2>Edit Business Card</h2>

    <input id="nameInput" placeholder="Name">
    <input id="titleInput" placeholder="Title">
    <input id="companyInput" placeholder="Company">
    <input id="locationInput" placeholder="Location">
    <textarea id="bioInput" placeholder="Short bio"></textarea>

    <input id="phoneInput" placeholder="Phone">
    <input id="emailInput" placeholder="Email">
    <input id="websiteInput" placeholder="Website">

    <input id="linkedinInput" placeholder="LinkedIn URL">
    <input id="instagramInput" placeholder="Instagram URL">
    <input id="facebookInput" placeholder="Facebook URL">
    <input id="tiktokInput" placeholder="TikTok URL">

    <label>Upload Photo</label>
    <input id="photoFile" type="file" accept="image/*">

    <button onclick="saveCard()">Save</button>
</div>

<script>
const ACCESS_CODE = "Star2025";

function unlock() {
    if (document.getElementById("unlockInput").value === ACCESS_CODE) {
        document.getElementById("lockScreen").style.display = "none";
        document.getElementById("editor").style.display = "block";
        loadForm();
    } else {
        alert("Incorrect code");
    }
}
</script>

<script src="script.js"></script>

</body>
</html>
