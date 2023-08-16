//script for logger page
const register = document.querySelector(".register");
const login = document.querySelector(".logger-form");
const registerBtn = document.querySelector(".submit");
const user = document.querySelector(".form-input-user");
const pwd = document.querySelector(".form-input-pwd");
const formSubmit = document.querySelector(".form-submit");

registerBtn.addEventListener("click", (evt) => {
  evt.target.style.display = "none";
  login.style.display = "none";
  register.style.display = "flex";
  user.style.display = "block";
  pwd.style.display = "block";
  formSubmit.style.display = "block";
});
