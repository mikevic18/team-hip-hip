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

plusButton.addEventListener("click", () => {
    popupForm.style.display = "flex";
});
popupForm.addEventListener("click", (event) => {
    if (event.target === popupForm) popupForm.style.display = "none";
});