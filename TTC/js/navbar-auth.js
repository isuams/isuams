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
    body: JSON.stringify({ email, password })
  });

  if (res.ok) {
  const data = await res.json();
  localStorage.setItem("api_token", data.token);
  await updateNavbar();

  // ✅ Close the login modal
  const modalEl = document.getElementById("loginModal");
  const modal = bootstrap.Modal.getInstance(modalEl)
    || new bootstrap.Modal(modalEl);
  modal.hide();
}
  else {
    alert("Login failed — check email/password");
  }
}

/**
 * Log out current user
 */
function logout() {
  fetch(`${API_BASE}/api/logout`, {
    method: "POST",
  }).finally(() => {
    window.location.reload();
  });
  localStorage.removeItem("api_token");
}

/**
 * Update navbar based on login state
 */
async function updateNavbar() {
  try {
    const token = localStorage.getItem("api_token");

	const headers = token ? {
	  "Authorization": `Bearer ${token}`
	} : {};

	const res = await fetch(`${API_BASE}/api/me`, { headers });

	const newToken = res.headers.get("X-New-Token");
	if (newToken) {
	  localStorage.setItem("api_token", newToken);
	}

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