
const logout = async () => {
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem("token"),
        })
    }
    
    const response = await fetch("http://localhost:3000/users/logout", options);
    const data = await response.json();

    if (response.status == 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        window.location.assign("index.html");
    } else {
        alert(data.error);
    }
}