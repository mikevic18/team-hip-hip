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
                img_url: form.get("img_url"),
                category: "listing",
                price: form.get("price")
            }),
        };

        const response = await fetch(
            "http://localhost:3000/listings",
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
        let url = "http://localhost:3000/listings";
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
    
    function createDonationElement(donation, admin) {
        console.log(donation);
        const mainDiv = document.createElement("div");
        mainDiv.classList.add(
            "col-sm-6",
            "col-md-6",
            "col-lg-4",
            "col-xl-3"
        );
        mainDiv.setAttribute("id", `donation-${donation.id}`);
    
        const imgDiv = document.createElement("div");
        imgDiv.classList.add("card","h-100", "border-black");
        
        const img = document.createElement("img");
        img.classList.add("card-img-top", "img-fluid");
        img.setAttribute("src", donation.image_url);
        imgDiv.appendChild(img);
        

        const secondDiv = document.createElement("div");
        secondDiv.classList.add("card-body", "pb-0");
    
        const title = document.createElement("p");
        title.classList.add("mb-0");
        title.setAttribute("id","donation-title");
        title.innerHTML= donation.title;
        imgDiv.appendChild(title);

        imgDiv.appendChild(secondDiv);
        
        const donationText = document.createElement("div");
        donationText.setAttribute("id", "donation-text");
        donationText.innerHTML = `<div class="card-footer bg-white pt-0 border-0 text-left">
        <div class="row">
            <div class="col">
                <p class="lead mb-0 text-left font-weight-bold">£ ${donation.price}</p>
                <p class="lead mb-0 text-left font-weight-bold">Contact: ${donation.contact}</p>
                <small class="ml-3">
                    <a class="btn btn-info" href="#">Edit</a>
                    <a class="btn btn-danger" href="#">Delete</a>
                </small>
            </div>
        </div>
    </div>`;
    
        imgDiv.appendChild(donationText);
        secondDiv.setAttribute("id", `tip-${donation.id}`);
        
        imgDiv.appendChild(secondDiv);
        
        // if (!admin) createEditDeleteButtons(donation, imgDiv);
        mainDiv.appendChild(imgDiv);
        return mainDiv;
    }
    
    async function createAdminButtons() {
        if (localStorage.getItem("isAdmin") != "true") return;
        const mainContainer = document.getElementById("content-container");
        let adminButton = document.createElement("button");
        adminButton.innerHTML = "Unapproved";
        adminButton.setAttribute("id", "unApproved");
        adminButton.setAttribute("onclick", "displayUnApproved()");
        adminButton.setAttribute("class","btn btn-primary")
        adminButton.setAttribute("width","250px");
        mainContainer.appendChild(adminButton);
    }
    async function displayUnApproved() {
        const mainContainer = document.getElementById("content-container");
        mainContainer.innerHTML = "";
        let adminButton = document.createElement("button");
        adminButton.innerHTML = "Approved";
        adminButton.setAttribute("id", "approvedPosts");
        adminButton.setAttribute("onclick", "displayApproved()");
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
    
        masterDiv.appendChild(editButton);
        masterDiv.appendChild(deleteButton);
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
            `http://localhost:3000/${elementType[0]}/vote/${elementType[0]}`,
            {
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body:{
                    votes:1
                }
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
        const donationPosts = await fetchDonations(options, adminFuncs);
        if (!donationPosts) return;
        const mainContainer = document.getElementById("content-container");
        donationPosts.forEach(async (donation) => {
            let superDiv = createDonationElement(donation, adminFuncs);
            if (adminFuncs) {
                await createApprovalDenialButtons(superDiv);
            }
            mainContainer.appendChild(superDiv);
        });
    }
    renderDonations();