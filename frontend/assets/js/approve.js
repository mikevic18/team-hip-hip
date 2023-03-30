document.getElementById("approve").addEventListener("click", async (e) => {
    e.preventDefault()

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            is_approved: true
        })
    }

    // Need to get id from the post that has been clicked on

    const response = await fetch(`http://localhost:3000/complaints/${id}`)
    const data = await response.json()

})