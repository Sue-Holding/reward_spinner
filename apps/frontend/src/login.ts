const form = document.getElementById("login-form") as HTMLFormElement;
const errorMsg = document.getElementById("error") as HTMLParagraphElement;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const sellerId = (document.getElementById("username") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement).value;

  try {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sellerId, password })
    });

    if (!res.ok) {
      // errorMsg.style.display = "block";
      return;
    }

    const data = await res.json();

    // this save the jwt token
    localStorage.setItem("token", data.token);
    localStorage.setItem("sellerId", data.sellerId);
    localStorage.setItem("sellerName", data.name);

    // redirect to dashboard after successful login
    window.location.href = "/dashboard.html";
  } catch (err) {
    console.error(err);

  }
});
