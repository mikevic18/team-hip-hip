document.getElementById("new-main-post-form").addEventListener("submit", async (e) => {
    e.preventDefault()

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: form.get("title"),
            content: form.get("content"),
            category: "complaints",
            user_id:1
        })
    }

    const response = await fetch("http://localhost:3000/complaints", options);
    const data = await response.json()

    if (response.status == 200) {
        alert("Complaint submitted. It will appear once it has been approved.")
        window.location.reload()
    } else {
        alert(data.error)
    }
})