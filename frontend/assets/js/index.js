function createPostElements(dataArray) {
    dataArray.forEach((dataElement) => {
        const mainDiv = document.createElement("div");
        mainDiv.classList.add(
            "row",
            "d-flex",
            "justify-content-center",
            "complaint-box"
        );
        const secondDiv = document.createElement("div");
        secondDiv.classList.add("col-8", "complaint-text");
        const headerOfComplaint = document.createElement("h3");
        headerOfComplaint.classList.add("text-center");
        headerOfComplaint.setAttribute("id", "complaint-title");
        headerOfComplaint.innerHTML = dataElement.title;
        const complaintText = document.createElement("p");
        complaintText.innerHTML = dataElement.content;
        let elem = createPostSubElements(dataElement.linkedPosts);
        container.appendChild(elem);
    });
}
function createPostSubElements(posts) {
    posts.forEach((post) => {
        const postElement = document.createElement("p");
        postElement.innerHTML = post.content;
    });
}
async function loadPosts() {
    const options = {
        headers: {
            Authorization: localStorage.getItem("token"),
        },
    };
    const complaintData = await fetch(
        "http://localhost:3000/complaint/top",
        options
    );

    if (complaintData.status != 200) {
        return console.log("Error: " + complaintData.status);
    }
    const complaintPost = await complaintData.json();

    const container = document.getElementById("post-container");

    complaintPost.forEach((p) => {});

    const informationData = await fetch(
        "http://localhost:3000/information/top",
        options
    );

    if (informationData.status != 200 && informationData.status != 403) {
        return console.log("Error: " + informationData.status);
    }
}

function edit(divId) {
    const div_title = divId.querySelector("#complaint-title");
    const div_title_content = div_title.textContent;
    const input_title = document.createElement("input");
    input_title.type = "text";
    input_title.id = "complaint-title-field";
    input_title.value = div_title_content;
    div_title.replaceWith(input_title);
    const div_content = divId.querySelector("#complaint");
    const input_content = document.createElement("input");
    input_content.type = "text";
    input_content.id = "complaint-content-field";
    input_content.value = div_content.textContent;
    div_content.replaceWith(input_content);
}

function createEditFields(event) {
    const div = event.target.parentNode;
    const divId = div.id;
    div.querySelector("#edit").style.display = "none";
    document.getElementById(divId).innerHTML += `
    <button id="submit">Submit</button>`;
    edit(div);
    document.getElementById("submit").addEventListener("click", submit_new);
}

async function submit_new() {
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

loadPosts();
