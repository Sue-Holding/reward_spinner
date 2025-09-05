const form = document.getElementById("login-form") as HTMLFormElement;
const errorMsg = document.getElementById("error") as HTMLParagraphElement;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = (document.getElementById("username") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement).value;

  // Dummy inloggning (hårdkodad användare)
  if (username === "admin" && password === "1234") {
    console.log("Login successful!");

    // Spara enkel flagga i localStorage
    localStorage.setItem("loggedIn", "true");

    // Redirect till dashboard
    window.location.href = "/src/dashboard.html";
  } else {
    errorMsg.style.display = "block";
  }
});
