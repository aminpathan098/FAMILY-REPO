const API = "https://your-backend-url.onrender.com"; // change this after deploying backend

let loggedIn = false;

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch(`${API}/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({email, password})
  }).then(res => {
    if (res.ok) {
      loggedIn = true;
      document.getElementById("login-box").style.display = "none";
      document.getElementById("contact-form").style.display = "block";
    } else {
      alert("Login failed");
    }
  });
}

function addContact() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;

  fetch(`${API}/contacts`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({name, phone, address})
  }).then(() => loadContacts());
}

function loadContacts() {
  fetch(`${API}/contacts`)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("contact-list");
      list.innerHTML = "";
      data.forEach(c => {
        list.innerHTML += `<li>${c.name} - ${c.phone} - ${c.address} 
          ${loggedIn ? `<button onclick="deleteContact(${c.id})">❌</button>` : ""}
        </li>`;
      });
    });
}

function deleteContact(id) {
  fetch(`${API}/contacts/${id}`, { method: "DELETE" })
    .then(() => loadContacts());
}

window.onload = loadContacts;
