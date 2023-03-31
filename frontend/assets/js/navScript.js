function openNav() {
    document.getElementById("sidebar").style.width = "250px";
    document.getElementById("page-content").style.marginLeft = "150px";
}

function closeNav() {
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("page-content").style.marginLeft = "0";
}

const plusButton = document.querySelector(".plus-button");
const popupForm = document.getElementById("new-post-container");

const accountsBtn = document.querySelector(".accounts-block")
const accountLinks = document.querySelector(".account-links")

const loginBtn = document.querySelector(".login-option")
const signupBtn = document.querySelector(".signup-option")
const logoutBtn = document.querySelector(".logout-option")

accountsBtn.addEventListener("click", () => {
    accountLinks.style.display = "unset"
    if (localStorage.getItem("token")) {
        logoutBtn.style.display = "unset"
        loginBtn.style.display = "none"
        signupBtn.style.display = "none"
    } else {
        loginBtn.style.display = "unset"
        signupBtn.style.display = "unset"
        logoutBtn.style.display = "none"
    }
})

document.querySelector(".container").addEventListener("click", () => {
    accountLinks.style.display = "none"
    logoutBtn.style.display = "none"
    loginBtn.style.display = "none"
    signupBtn.style.display = "none"
})

try {
    plusButton.addEventListener("click", () => {
        popupForm.style.display = "flex";
    });
    popupForm.addEventListener("click", (event) => {
        if (event.target === popupForm) popupForm.style.display = "none";
    });

} catch(err) {
    console.log(err)
}

