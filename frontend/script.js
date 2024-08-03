document.getElementById("login-btn").addEventListener("click", () => {
  window.location.href = "https://reachinbox-qhse.onrender.com/auth/google";
});

window.onload = () => {
  fetch("https://reachinbox-qhse.onrender.com/api/user")
    .then((response) => response.json())
    .then((user) => {
      if (user.email) {
        document.getElementById("user-info").classList.remove("hidden");
        document.getElementById("email").textContent = `Email: ${user.email}`;
      }
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
};
