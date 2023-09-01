//script for logger page
//script for the setting page
const profile = document.querySelector("#profile");
const changePwd = document.querySelector("#change-pwd");
const deleteAccount = document.querySelector("#delete-account");
const indexProfile = document.querySelector(".profile");
const indexPwd = document.querySelector(".change-pwd");
const indexAccount = document.querySelector(".delete-account");
//editing button selector
const editBtn = document.querySelectorAll(".edit-btn");
//coz we are selecting many buttons with a same class name
const editBtns = Array.from(editBtn);

editBtns.forEach((button) => {
  button.addEventListener("click", (evt) => {
    //this prevents me from creating the input button here and many more, and effeciency
    const editInput = evt.target.nextElementSibling;
    editInput.classList.remove("d-none");
  });
});

indexPwd.addEventListener("click", (evnt) => {
  profile.classList.add("d-none");
  changePwd.classList.remove("d-none");
  deleteAccount.classList.add("d-none");
});
indexAccount.addEventListener("click", (event) => {
  profile.classList.add("d-none");
  changePwd.classList.add("d-none");
  deleteAccount.classList.remove("d-none");
});
indexProfile.addEventListener("click", (evt) => {
  profile.classList.remove("d-none");
  changePwd.classList.add("d-none");
  deleteAccount.classList.add("d-none");
});
