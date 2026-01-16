const api = "https://api.adviceslip.com/advice";
const btn = document.getElementById("newad");
const ad = document.getElementById("ad");
const uname = document.getElementById("usernameInput");
const sbtn = document.getElementById("saveName");
const nameModal = document.getElementById("nameModal");
const printuser = document.getElementById("usernamehello");

// Disable advice button until name is entered
btn.disabled = true;

// On page load, check if username exists
window.addEventListener("DOMContentLoaded", () => {
  const value = localStorage.getItem("username");
  if (value) {
    nameModal.style.display = "none";
    printuser.innerText = `Welcome back, ${value} 👋`;
    btn.disabled = false;
  }
});

// Save name and unlock advice
sbtn.addEventListener("click", () => {
  const username = uname.value.trim();
  if (username === "") {
    uname.placeholder = "Please enter your name";
  } else {
    localStorage.setItem("username", username);
    nameModal.style.display = "none";
    printuser.innerText = `Hi ${username} 👋`;
    btn.disabled = false;
  }
});

// Fetch advice
btn.addEventListener("click", async () => {
  btn.disabled = true;
  btn.textContent = "Loading...";
  try {
    const response = await fetch(api);
    const data = await response.json();
    const username = localStorage.getItem("username");
    ad.innerText = `${username ? username + ", here's your advice: " : ""}${data.slip.advice}`;
  } catch (error) {
    console.error("fetching error:", error);
    ad.innerText = "Oops! Could not fetch advice.";
  } finally {
    btn.disabled = false;
    btn.textContent = "Get New Advice";
  }
});