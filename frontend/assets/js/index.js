let options = {
    headers: {
        Authorization: localStorage.getItem("token"),
    },
};

let currentUser;
async function setCurrentUser() {
    let token = localStorage.getItem("token");
    if (!token) return;
    currentUser = await fetch(
        `http://localhost:3000/users/username/token/${token}`
    );
    currentUser = await currentUser.json();
    currentUser = currentUser.user_id;
}
async function deletePost(event) {
    const div = event.target.parentNode;
    const divId = div.id;
    const elementType = divId.split("-");
    const type = elementType[0];
    const idOfType = elementType[1];
    const response = await fetch(`http://localhost:3000/${type}/${idOfType}`, {
        method: "DELETE",
        headers: {
            Authorization: localStorage.getItem("token"),
        },
    });
    if (response.status != 200) {
        console.log("Error:" + response);
        alert(
            "An error occurred: " + [
                response.status == 404 ?
                "not authorized" :
                response.statusText,
            ] +
            "\n" +
            " Please try again later!"
        );
    } else {
        alert("Post has been deleted");
        window.location.reload();
    }
}

async function submitChanges(event) {
    const div = event.target.parentNode;
    const divId = div.id;
    const elementType = divId.split("-");
    const type = elementType[0];
    const idOfType = elementType[1];
    let title_text;
    let title_content;
    if (elementType[0] == "complaints") {
        title_content = div.querySelector("#complaint-title-field");
        title_text = title_content.value;
    }
    const input_content = div.querySelector("#complaint-content-field");
    const content_text = input_content.value;
    let response = await fetch(`http://localhost:3000/${type}/${idOfType}`, {
        method: "PATCH",
        headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title_text,
            content: content_text,
            [type == "complaints" ? "complaint_id" : "post_id"]: idOfType,
        }),
    });
    if (response.statusCode === 200) {
        alert("Success");
    } else {
        console.log(response.status);
        alert();
    }

    window.location.reload();
}

async function handleFetchError(response) {
    if (response.status !== 200)
        return console.error(`Error: ${response.status}`);
    return await response.json();
}

async function fetchDonations(options, isAdmin) {
    let url = "http://localhost:3000/complaints";
    if (isAdmin) url += "/unapproved";
    const complaintData = await fetch(url, options);
    return handleFetchError(complaintData);
}

async function fetchPostData(complaintId, options) {
    const postData = await fetch(
        `http://localhost:3000/posts/complaint/${complaintId}`,
        options
    );
    return await handleFetchError(postData);
}

async function fetchUsername(userId) {
    const response = await fetch(
        `http://localhost:3000/users/username/${userId}`
    );
    return await handleFetchError(response);
}

function edit(divId) {
    try {
        const div_title = divId.querySelector(`#complaint-title`);
        const div_title_content = div_title.textContent;
        const input_title = document.createElement("input");
        input_title.type = "text";
        input_title.id = "complaint-title-field";
        input_title.value = div_title_content;
        div_title.replaceWith(input_title);
    } catch (e) {}
    const div_content = divId.querySelector(`#complaint-text`);
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
    let editButton = div.querySelector("#submit");
    editButton.setAttribute("onclick", "submitChanges(event)");
}

function createReplyFields(event) {
    const div = event.target.parentNode;
    const divId = div.id;
    div.querySelector("#reply").style.display = "none";
    document.getElementById(divId).innerHTML += `
    <button id="submit">Submit</button>`;
    const input_content = document.createElement("input");
    input_content.type = "text";
    input_content.id = "reply-content-field";
    div.appendChild(input_content);
    let replyButton = div.querySelector("#submit");
    replyButton.setAttribute("onclick", "submitReply(event)");
}
async function submitReply(event) {
    const div = event.target.parentNode;
    const divId = div.id;
    const elementType = divId.split("-");
    const input_content = div.querySelector("#reply-content-field");
    const content_text = input_content.value;
    let response = await fetch(`http://localhost:3000/post`, {
        method: "POST",
        headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: "",
            content: content_text,
            complaint_id: elementType[1],
            category: "complaints",
        }),
    });
    if (response.statusCode === 200) {
        alert("Success");
    } else {
        console.log(response.status);
        alert();
    }

    window.location.reload();
}
async function createDonationElement(complaint, admin) {
    const mainDiv = document.createElement("div");
    mainDiv.classList.add(
        "row",
        "d-flex",
        "justify-content-center",
        "complaint-box"
    );
    mainDiv.setAttribute("id", `complaints-${complaint.complaint_id}`);
    const nameParagraph = document.createElement("p");
    const getUserName = await fetchUsername(complaint.user_id);
    nameParagraph.innerHTML = getUserName.username;

    const secondDiv = document.createElement("div");
    secondDiv.classList.add("col-8", "complaint-text");

    const headerOfComplaint = document.createElement("h3");
    headerOfComplaint.classList.add("text-center");
    headerOfComplaint.setAttribute("id", "complaint-title");
    headerOfComplaint.innerHTML = complaint.title;

    const complaintText = document.createElement("p");
    complaintText.setAttribute("id", "complaint-text");
    complaintText.innerHTML = complaint.content;
    secondDiv.appendChild(nameParagraph);
    secondDiv.appendChild(headerOfComplaint);
    secondDiv.appendChild(complaintText);
    secondDiv.setAttribute("id", `complaints-${complaint.complaint_id}`);

    mainDiv.appendChild(secondDiv);

    if (!admin) createEditDeleteButtons(complaint, mainDiv);
    return mainDiv;
}

async function createPostElement(post) {
    const masterDiv = document.createElement("div");
    masterDiv.classList.add("col-8", "complaint-text");

    const nameParagraph = document.createElement("p");
    const getUserName = await fetchUsername(post.user_id);
    nameParagraph.innerHTML = getUserName.username;

    const responseParagraph = document.createElement("p");
    responseParagraph.setAttribute("id", "complaint-text");
    responseParagraph.innerHTML = post.content;

    masterDiv.appendChild(nameParagraph);
    masterDiv.appendChild(responseParagraph);
    masterDiv.setAttribute("id", `post-${post.id}`);
    createEditDeleteButtons(post, masterDiv);

    return masterDiv;
}
async function createAdminButtons() {
    if (localStorage.getItem("isAdmin") != "true") return;
    const mainContainer = document.getElementById("content-container");
    let adminButton = document.createElement("button");
    adminButton.innerHTML = "Unapproved";
    adminButton.setAttribute("id", "unApproved");
    adminButton.setAttribute("onclick", "displayUnApproved()");
    adminButton.setAttribute("class", "btn btn-primary");
    mainContainer.appendChild(adminButton);
}
async function displayUnApproved() {
    const mainContainer = document.getElementById("content-container");
    mainContainer.innerHTML = "";
    let adminButton = document.createElement("button");
    adminButton.innerHTML = "Approved";
    adminButton.setAttribute("id", "approvedPosts");
    adminButton.setAttribute("onclick", "displayApproved()");
    adminButton.setAttribute("class", "btn btn-primary");
    mainContainer.appendChild(adminButton);
    renderDonations(true);
}
async function displayApproved() {
    const mainContainer = document.getElementById("content-container");
    mainContainer.innerHTML = "";
    createAdminButtons();
    renderDonations();
}
async function createApprovalDenialButtons(masterDiv) {
    if (localStorage.getItem("isAdmin") != "true") return;
    const approveButton = document.createElement("button");
    approveButton.setAttribute("onclick", "approvePost(event)");
    approveButton.setAttribute("id", "edit");
    approveButton.setAttribute("class", "btn btn-success")
    approveButton.textContent = "Approve";

    const denyButton = document.createElement("button");
    denyButton.setAttribute("onclick", "deletePost(event)");
    denyButton.setAttribute("id", "delete");
    denyButton.setAttribute("class", "btn btn-danger");
    denyButton.textContent = "Delete";

    masterDiv.appendChild(approveButton);
    masterDiv.appendChild(denyButton);
}

createAdminButtons();
async function approvePost(event) {
    const div = event.target.parentNode;
    const divId = div.id;
    const elementType = divId.split("-");
    let response = await fetch(
        `http://localhost:3000/${elementType[0]}/approve/${elementType[1]}`, {
            method: "POST",
            headers: {
                Authorization: localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ is_approved: true }),
        }
    );
    if (response.status === 200) {
        alert("Approved successfully");
    }
}

function createEditDeleteButtons(post, masterDiv) {
    if (post.user_id != currentUser) return;

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("onclick", "deletePost(event)");
    deleteButton.setAttribute("id", "delete");
    deleteButton.setAttribute("class", "btn btn-danger");
    deleteButton.textContent = "Delete";

    const editButton = document.createElement("button");
    editButton.setAttribute("onclick", "createEditFields(event)");
    editButton.setAttribute("id", "edit");
    editButton.setAttribute("class", "btn btn-info");
    editButton.textContent = "Edit";

    masterDiv.appendChild(editButton);
    masterDiv.appendChild(deleteButton);
}
async function createReplyButton(masterDiv) {
    if (!currentUser) return;
    const replyButton = document.createElement("button");
    replyButton.setAttribute("onclick", "createReplyFields(event)");
    replyButton.setAttribute("id", "reply");
    replyButton.setAttribute("class", "btn btn-info");
    replyButton.textContent = "Reply";
    masterDiv.appendChild(replyButton);
}

function createVoteButtons(masterDiv) {
    if (!currentUser) return;
    const thumbsUpButton = document.createElement("button");
    thumbsUpButton.setAttribute("onclick", "sendUpVote(event)");
    thumbsUpButton.setAttribute("id", "upVoteButton");
    thumbsUpButton.textContent = "^";

    const thumbsDownButton = document.createElement("button");
    thumbsDownButton.setAttribute("onclick", "sendDownVote(event)");
    thumbsDownButton.setAttribute("id", "downVoteButton");
    thumbsDownButton.textContent = "v";

    masterDiv.appendChild(thumbsUpButton);
    masterDiv.appendChild(thumbsUpButton);
}
async function sendUpVote(event) {
    const div = event.target.parentNode;
    const divId = div.id;
    const elementType = divId.split("-");
    let response = await fetch(
        `http://localhost:3000/${elementType[0]}/${elementType[0]}`, {
            method: "POST",
            headers: {
                Authorization: localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
        }
    );
}
async function sendDownVote(event) {
    const div = event.target.parentNode;
    const divId = div.id;
    const elementType = divId.split("-");
    let response = await fetch(
        `http://localhost:3000/${elementType[0]}/${elementType[0]}`, {
            method: "POST",
            headers: {
                Authorization: localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: "",
                content: content_text,
                complaint_id: elementType[1],
                category: "complaints",
            }),
        }
    );
}

async function renderDonations(adminFuncs) {
    await setCurrentUser();
    const options = { method: "GET" };
    const complaintPosts = await fetchDonations(options, adminFuncs);
    if (!complaintPosts) return;
    const mainContainer = document.getElementById("content-container");
    complaintPosts.forEach(async(complaint) => {
        let superDiv = await createDonationElement(complaint, adminFuncs);
        let postsOnTarget = await fetchPostData(complaint.complaint_id);
        if (adminFuncs) {
            await createApprovalDenialButtons(superDiv);
        }
        postsOnTarget ?.forEach(async(post) => {
            let element = await createPostElement(post);
            superDiv.appendChild(element);
        });
        mainContainer.appendChild(superDiv);
        await createReplyButton(superDiv);
    });
}
renderDonations();