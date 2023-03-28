async function loadSpecificDiary() {
    const response = await fetch(`http://localhost:3000/diary/${diaryId}`);
    const data = await response.json();
    document.getElementById("diary").innerHTML = `<div class="title">
    <p id="title"></p>
</div>
<div class="content">
    <div id="content"></div>
</div>`;
    document.getElementById("list_of_diary").innerHTML = "";
    document.getElementById("title").textContent = data.title;
    document.getElementById("content").textContent = data.content;
    document.getElementById("edit").style.display = "block";
    document.getElementById("save").style.display = "block";
    document.getElementById("create-fields").style.display = "none";
    document.getElementById("edit").addEventListener("click", edit);
    document.getElementById("save").addEventListener("click", send);
    document.getElementById("delete").style.display = "block";
    document.getElementById("delete").addEventListener("click", deleteDiary);
}

async function loadFrontPage() {
    const response = await fetch("http://localhost:3000/diary/");
    const data = await response.json();
    for (let i = 0; i < data.length; i++) {
        document.getElementById(
            "list_of_diary"
        ).innerHTML += `<li><a href="http://localhost:5500/frontend/diary.html?id=${data[i].id}">${data[i].title}</a></li>`;
    }
    document
        .getElementById("create-fields")
        .addEventListener("click", createField);
}

function createField() {
    document.getElementById("create-fields").style.display = "none";
    document.getElementById("diary").innerHTML = `<div class="title">
    <p id="title"></p>
</div>
<div class="content">
    <div id="content"></div>
</div>`;
    edit();
    document.getElementById("submit").style.display = "block";
    document.getElementById("submit").addEventListener("click", submit_new);       
}

async function submit_new(){
    const input_content = document.getElementById("input_content");
    const content_text = input_content.value;
    const title_content = document.getElementById("title_input_content");
    const title_text = title_content.value;
    await fetch(`http://localhost:3000/diary/`, {
        method: "POST",
        body: JSON.stringify({ title: title_text, content: content_text }),
        headers: { "Content-Type": "application/json" },
    });
    window.location.reload();
}


async function send() {
    const input_content = document.getElementById("input_content");
    const content_text = input_content.value;
    const title_content = document.getElementById("title_input_content");
    const title_text = title_content.value;
    await fetch(`http://localhost:3000/diary/${diaryId}`, {
        method: "PATCH",
        body: JSON.stringify({ title: title_text, content: content_text }),
        headers: { "Content-Type": "application/json" },
    });
    window.location.reload();
}
async function deleteDiary() {
    await fetch(`http://localhost:3000/diary/${diaryId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
    alert("Diary deleted");
    window.location.assign('http://localhost:5500/frontend/diary.html');
}
let urlParams = new URLSearchParams(window.location.search);
let diaryId = urlParams.get("id");
if (diaryId) {
    loadSpecificDiary();
} else {
    loadFrontPage();
}
