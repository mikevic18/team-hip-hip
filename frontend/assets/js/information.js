async function loadPosts() {
    const complaintData = await fetch(
        "http://localhost:3000/complaint/top",
        options
    );

    if (complaintData.status != 200) {
        return console.log("Error: " + complaintData.status);
    }
    const complaintPost = await complaintData.json();

    const container = document.getElementById("post-container");

    complaintPost.forEach((p) => {
        
    });

    const informationData = await fetch(
        "http://localhost:3000/information/top",
        options
    );

    if (informationData.status != 200 && informationData.status != 403) {
        return console.log("Error: " + informationData.status);
    }
}