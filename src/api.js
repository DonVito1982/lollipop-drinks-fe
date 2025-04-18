const API_BASE = "http://localhost:3000";

export async function getDrinks(token) {
  const headers = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetch(`${API_BASE}/drinks`, headers);

  if (!response.ok) {
    throw new Error("Failed to fetch drinks");
  }
  return await response.json();
}

export async function signup(userData) {
  const response = await fetch(`${API_BASE}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Signup failed");
  }

  return await response.json();
}

export async function login(credentials) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return await response.json();
}
