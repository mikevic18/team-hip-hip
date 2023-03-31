document
    .getElementById("new-main-post-form")
    .addEventListener("submit", async (e) => {
        e.preventDefault();

        const form = new FormData(e.target);

        const options = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify({
                title: form.get("title"),
                content: form.get("content"),
                video_url: form.get("video_url"),
                category: "skills",
            }),
        };

        const response = await fetch(
            "http://localhost:3000/skills",
            options
        );
        const data = await response.json();

        if (response.status == 201) {
            alert(
                "Tip has been submitted. It will appear once it has been approved."
            );
            window.location.reload();
        } else {
            alert(data.error);
        }
    });

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
                "An error occurred: " +
                    [
                        response.status == 404
                            ? "not authorized"
                            : response.statusText,
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
        let url = "http://localhost:3000/skills";
        if (isAdmin) url += "/unapproved";
        const tipsData = await fetch(url, options);
        return handleFetchError(tipsData);
    }
    
    async function fetchUsername(userId) {
        const response = await fetch(
            `http://localhost:3000/users/username/${userId}`
        );
        return await handleFetchError(response);
    }
    
    function edit(divId) {
        try {
            const div_title = divId.querySelector(`#tip-title`);
            const div_title_content = div_title.textContent;
            const input_title = document.createElement("input");
            input_title.type = "text";
            input_title.id = "tip-title-field";
            input_title.value = div_title_content;
            div_title.replaceWith(input_title);
        } catch (e) {}
        const div_content = divId.querySelector(`#tip-text`);
        const input_content = document.createElement("input");
        input_content.type = "text";
        input_content.id = "tip-content-field";
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
    
    function createDonationElement(tip, admin) {
        const mainDiv = document.createElement("div");
        mainDiv.classList.add(
            "row",
            "d-flex",
            "justify-content-center",
            "tip-box"
        );
        mainDiv.setAttribute("id", `tip-${tip.id}`);
    
        const secondDiv = document.createElement("div");
        secondDiv.classList.add("col-8", "tip-text");
    
        const headerOfComplaint = document.createElement("h3");
        headerOfComplaint.classList.add("text-center");
        headerOfComplaint.setAttribute("id", "tip-title");
        headerOfComplaint.innerHTML = tip.title;
    
        secondDiv.appendChild(headerOfComplaint);
        
        const videoElement = document.createElement("iframe");

        videoElement.setAttribute("src",tip.video_url);
        videoElement.setAttribute("title","video player");
        videoElement.setAttribute("allow","accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
        videoElement.setAttribute("allowFullscreen","");
        videoElement.setAttribute("width",560);
        videoElement.setAttribute("height",315);
        videoElement.setAttribute("frameborder", 0);

        secondDiv.appendChild(videoElement);


        const tipText = document.createElement("p");
        tipText.setAttribute("id", "tip-text");
        tipText.innerHTML = tip.content;
    
        
        secondDiv.appendChild(tipText);
        secondDiv.setAttribute("id", `tip-${tip.id}`);
        mainDiv.appendChild(secondDiv);

        if (!admin) createEditDeleteButtons(tip, secondDiv);
        createVoteButtons(secondDiv,tip)
        return mainDiv;
    }
    
    async function createAdminButtons() {
        if (localStorage.getItem("isAdmin") != "true") return;
        const mainContainer = document.getElementById("content-container");
        let adminButton = document.createElement("button");
        adminButton.innerHTML = "Unapproved";
        adminButton.setAttribute("id", "unApproved");
        adminButton.setAttribute("onclick", "displayUnApproved()");
        adminButton.setAttribute("class","btn btn-primary");
        mainContainer.appendChild(adminButton);
    }
    async function displayUnApproved() {
        const mainContainer = document.getElementById("content-container");
        mainContainer.innerHTML = "";
        let adminButton = document.createElement("button");
        adminButton.innerHTML = "Approved";
        adminButton.setAttribute("id", "approvedPosts");
        adminButton.setAttribute("onclick", "displayApproved()");
        adminButton.setAttribute("class","btn btn-primary");
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
        approveButton.textContent = "Approve";
    
        const denyButton = document.createElement("button");
        denyButton.setAttribute("onclick", "deletePost(event)");
        denyButton.setAttribute("id", "delete");
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
            `http://localhost:3000/${elementType[0]}/approve/${elementType[1]}`,
            {
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
        deleteButton.textContent = "Delete";
    
        const editButton = document.createElement("button");
        editButton.setAttribute("onclick", "createEditFields(event)");
        editButton.setAttribute("id", "edit");
        editButton.textContent = "Edit";
    
        masterDiv.appendChild(deleteButton);
        deleteButton.setAttribute("class","btn btn-primary");
    }
    function createVoteButtons(masterDiv,tip) {
        if (!currentUser) return;
        const thumbsUpButton = document.createElement("button");
        thumbsUpButton.setAttribute("onclick", "sendUpVote(event)");
        thumbsUpButton.setAttribute("id", "upVoteButton");
        thumbsUpButton.setAttribute("class", "btn btn-primary fas fa-thumbs-up");
        const numberOfVotes = document.createElement("p");
        numberOfVotes.innerHTML = `Upvotes: ${tip.votes}`;
        const thumbsDownButton = document.createElement("button");
        thumbsDownButton.setAttribute("onclick", "sendDownVote(event)");
        thumbsDownButton.setAttribute("id", "downVoteButton");
        thumbsDownButton.setAttribute("class", "btn btn-primary fas fa-thumbs-down");
    }
    async function sendUpVote(event) {
        const div = event.target.parentNode;
        const divId = div.id;
        const elementType = divId.split("-");
        let response = await fetch(
            `http://localhost:3000/${elementType[0]}/vote/${elementType[1]}`,
            {
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    "vote":1,
                })
            }
        );
    }
    async function sendDownVote(event) {
        const div = event.target.parentNode;
        const divId = div.id;
        const elementType = divId.split("-");
        let response = await fetch(
            `http://localhost:3000/${elementType[0]}/${elementType[0]}`,
            {
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
        const tipPosts = await fetchDonations(options, adminFuncs);
        if (!tipPosts) return;
        const mainContainer = document.getElementById("content-container");
        tipPosts.forEach(async (tip) => {
            let superDiv = createDonationElement(tip, adminFuncs);
            if (adminFuncs) {
                await createApprovalDenialButtons(superDiv);
            }
            mainContainer.appendChild(superDiv);
        });
    }
    renderDonations();