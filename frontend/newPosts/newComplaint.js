document.getElementById("complaint-form").addEventListener("submit", async (e) => {
    e.preventDefault()

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            // add route to getting user ID
            title: form.get("title"),
            content: form.get("content"),
            category: "complaints"
        })
    }

    const response = await fetch("http://localhost:3000/posts", options);
    const data = await response.json()

    if (response.status == 200) {
        alert("Complaint submitted. It will appear once it has been approved.")
        window.location.assign("http://127.0.0.1:5500/frontend/complaints.html")
    } else {
        alert(data.error)
    }

})