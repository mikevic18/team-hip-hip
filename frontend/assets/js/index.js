
// // let currentUser;
// // async function setCurrentUser() {
// //     let token = localStorage.getItem("token");
// //     if(!token) return;
// //     currentUser = await fetch(
// //         `http://localhost:3000/users/username/token/${token}`
// //     );
// //     currentUser = await currentUser.json();
// //     currentUser = currentUser.user_id;
// // }
// // setCurrentUser();
// // async function getMainComplaints() {
// //     const complaintData = await fetch(
// //         "http://localhost:3000/complaints",
// //         options
// //     );
// //     if (complaintData.status != 200) {
// //         return console.log("Error: " + complaintData.status);
// //     }
// //     const complaintPost = await complaintData.json();
// //     const mainContainer = document.getElementById("content-container");
// //     complaintPost.forEach(async (complaint) => {
// //         const mainDiv = document.createElement("div");
// //         mainDiv.classList.add(
// //             "row",
// //             "d-flex",
// //             "justify-content-center",
// //             "complaint-box"
// //         );
// //         mainDiv.setAttribute("id", `complaints-${complaint.complaint_id}`);
// //         const secondDiv = document.createElement("div");
// //         secondDiv.classList.add("col-8", "complaint-text");
// //         const headerOfComplaint = document.createElement("h3");
// //         headerOfComplaint.classList.add("text-center");
// //         headerOfComplaint.setAttribute("id", "complaint-title");
// //         headerOfComplaint.innerHTML = complaint.title;
// //         const complaintText = document.createElement("p");
// //         complaintText.setAttribute("id", "complaint-text");
// //         complaintText.innerHTML = complaint.content;
// //         secondDiv.appendChild(headerOfComplaint);
// //         secondDiv.appendChild(complaintText);
// //         mainDiv.appendChild(secondDiv);
// //         mainContainer.appendChild(mainDiv);
// //         const postData = await fetch(
// //             `http://localhost:3000/posts/complaint/${complaint.complaint_id}`,
// //             options
// //         );
// //         if (postData.status != 200) {
// //             return console.log("Error: " + postData.status);
// //         }
// //         if (
// //             complaintData.user_id === currentUser ||
// //             localStorage.getItem("isAdmin") == "true"
// //         ) {
// //             let editButton = document.createElement("button");
// //             editButton.setAttribute("onclick", "createEditFields(event)");
// //             editButton.setAttribute("id", "edit");
// //             editButton.textContent = "Edit";
// //             let deleteButton = document.createElement("button");
// //             deleteButton.setAttribute("onclick", "deletePost(event)");
// //             deleteButton.setAttribute("id", "delete");
// //             deleteButton.textContent = "Delete";
// //             mainDiv.appendChild(editButton);
// //             mainDiv.appendChild(deleteButton);
// //         }
// //         const processedPosts = await postData.json();
// //         processedPosts.forEach(async (post) => {
// //             let masterDiv = document.createElement("div");
// //             masterDiv.classList.add("col-8", "complaint-text");
// //             let responseUserName = await fetch(
// //                 `http://localhost:3000/users/username/${post.user_id}`
// //             );
// //             responseUserName = await responseUserName.json();
// //             let nameParagraph = document.createElement("p");
// //             nameParagraph.innerHTML = responseUserName.username;
// //             let responseParagraph = document.createElement("p");
// //             responseParagraph.setAttribute("id", "complaint-text");
// //             responseParagraph.innerHTML = post.content;
// //             masterDiv.appendChild(nameParagraph);
// //             masterDiv.appendChild(responseParagraph);
// //             if (
// //                 post.user_id === currentUser ||
// //                 localStorage.getItem("isAdmin") == "true"
// //             ) {
// //                 let editButton = document.createElement("button");
// //                 editButton.setAttribute("onclick", "createEditFields(event)");
// //                 editButton.setAttribute("id", "edit");
// //                 editButton.textContent = "Edit";
// //                 let deleteButton = document.createElement("button");
// //                 deleteButton.setAttribute("onclick", "deletePost(event)");
// //                 deleteButton.setAttribute("id", "delete");
// //                 deleteButton.textContent = "Delete";
// //                 masterDiv.appendChild(editButton);
// //                 masterDiv.appendChild(deleteButton);
// //                 masterDiv.setAttribute("id", `post-${post.id}`);
// //             }
// //             mainDiv.appendChild(masterDiv);
// //         });
// //     });
// // }
// // getMainComplaints();

// // function createPostElements(dataArray) {
// //     dataArray.forEach((dataElement) => {
// //         const mainDiv = document.createElement("div");
// //         mainDiv.classList.add(
// //             "row",
// //             "d-flex",
// //             "justify-content-center",
// //             "complaint-box"
// //         );
// //         const secondDiv = document.createElement("div");
// //         secondDiv.classList.add("col-8", "complaint-text");
// //         const headerOfComplaint = document.createElement("h3");
// //         headerOfComplaint.classList.add("text-center");
// //         headerOfComplaint.setAttribute("id", "complaint-title");
// //         headerOfComplaint.innerHTML = dataElement.title;
// //         const complaintText = document.createElement("p");
// //         complaintText.innerHTML = dataElement.content;
// //         let elem = createPostSubElements(dataElement.linkedPosts);
// //         container.appendChild(elem);
// //     });
// // }
// // function createPostSubElements(posts) {
// //     posts.forEach((post) => {
// //         const postElement = document.createElement("p");
// //         postElement.innerHTML = post.content;
// //     });
// // }
// // async function deletePost(event) {
// //     const div = event.target.parentNode;
// //     const divId = div.id;
// //     const elementType = divId.split("-");
// //     const type = elementType[0];
// //     const response = await fetch(`http://localhost:3000/${type}/${elementType[1]}`, {
// //         method: "DELETE",
// //         headers: { "Content-Type": "application/json" },
// //     });
// //     if (response.status != 200) console.log("Error:" + response.status);
// //     alert("Post has been deleted");
// //     window.location.assign("http://localhost:5500/frontend/index.html");
// // }
// function edit(divId) {
//     try {
//         const div_title = divId.querySelector(`#complaint-title`);
//         const div_title_content = div_title.textContent;
//         const input_title = document.createElement("input");
//         input_title.type = "text";
//         input_title.id = "complaint-title-field";
//         input_title.value = div_title_content;
//         div_title.replaceWith(input_title);
//     } catch (e) {}
//     const div_content = divId.querySelector(`#complaint-text`);
//     const input_content = document.createElement("input");
//     input_content.type = "text";
//     input_content.id = "complaint-content-field";
//     input_content.value = div_content.textContent;
//     div_content.replaceWith(input_content);
// }

// function createEditFields(event) {
//     const div = event.target.parentNode;
//     const divId = div.id;
//     div.querySelector("#edit").style.display = "none";
//     document.getElementById(divId).innerHTML += `
//     <button id="submit">Submit</button>`;
//     edit(div);
//     document.getElementById("submit").addEventListener("click", submit_new);
// }

// async function submit_new() {
//     const input_content = document.getElementById("input_content");
//     const content_text = input_content.value;
//     const title_content = document.getElementById("title_input_content");
//     const title_text = title_content.value;
//     await fetch(`http://localhost:3000/complaints/`, {
//         method: "POST",
//         body: JSON.stringify({ title: title_text, content: content_text }),
//         options,
//     });
//     window.location.reload();
// }

// // loadPosts();
