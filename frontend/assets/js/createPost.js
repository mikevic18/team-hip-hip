let page = 0;
const categories = ["complaints", "listings", "information", "skill_share"]
let options = {
    headers: {
        Authorization: localStorage.getItem("token"),
    },
};

async function submitNewPost(){
    const input_content = document.getElementById("input_content");
    const content_text = input_content.value;
    const title_content = document.getElementById("title_input_content");
    const title_text = title_content.value;
    await fetch(`http://localhost:3000/posts/`, {
        method: "POST",
        body: JSON.stringify({ title: title_text||"test", content: content_text||"test", category: categories[page], user_id:1}),
        options
    });
    window.location.reload();
}
async function send() {
    const input_content = document.getElementById("input_content");
    const content_text = input_content.value;
    const title_content = document.getElementById("title_input_content");
    const title_text = title_content.value;
    await fetch(`http://localhost:3000/complaints/${diaryId}`, {
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