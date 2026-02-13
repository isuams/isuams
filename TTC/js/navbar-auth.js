// ================= Navbar Auth Helper =================

const API_BASE = "https://tortargetcontest.pythonanywhere.com";

/**
 * Log in from modal
 */
async function login() {
  const email = document.getElementById("loginEmail")?.value || "";
  const password = document.getElementById("loginPassword")?.value || "";

  const res = await fetch(`${API_BASE}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password })
  });

  if (res.ok) {
    // Reload ensures clean session + navbar update
    window.location.reload();
  } else {
    alert("Login failed — check email/password");
  }
}

/**
 * Log out current user
 */
function logout() {
  fetch(`${API_BASE}/api/logout`, {
    method: "POST",
    credentials: "include"
  }).finally(() => {
    window.location.reload();
  });
}

/**
 * Update navbar based on login state
 */
async function updateNavbar() {
  try {
    const res = await fetch(`${API_BASE}/api/me`, {
      credentials: "include"
    });

    if (!res.ok) {
      showLoggedOut();
      return;
    }

    const user = await res.json();
    showLoggedIn(user);

  } catch (err) {
    // Fail silently
    showLoggedOut();
  }
}

/**
 * Show logged-out navbar state
 */
function showLoggedOut() {
  document.getElementById("navLogin")?.classList.remove("d-none");
  document.getElementById("navUser")?.classList.add("d-none");
}

/**
 * Show logged-in navbar state
 */
function showLoggedIn(user) {
  document.getElementById("navLogin")?.classList.add("d-none");
  document.getElementById("navUser")?.classList.remove("d-none");

  const nameSpan = document.getElementById("navUserName");
  if (nameSpan) {
    nameSpan.textContent = user.alias || user.name;
  }

  if (user.role === "admin") {
    document
      .getElementById("adminLinkContainer")
      ?.classList.remove("d-none");
  }
}

// Run on page load
document.addEventListener("DOMContentLoaded", updateNavbar);