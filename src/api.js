const API_BASE = "http://localhost:3000";

export async function getStatus(token) {
  const headers = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetch(`${API_BASE}/status`, headers);

  if (!response.ok) {
    throw new Error("Failed to fetch drinks");
  }
  return await response.json();
}

export async function getDrinks(token) {
  const headers = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetch(`${API_BASE}/drinks`, headers);

  if (!response.ok) {
    throw new Error("Failed to fetch drinks");
  }
  return await response.json();
}

export async function takeDrink(drinkId) {
  const headers = {
    "Content-Type": "application/json",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  const body = {drink_id: {drinkId}}
  const response = await fetch(`${API_BASE}/user_drinks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });

  if (!response.ok) {
    throw new Error("Drink creation failed");
  }

  return await response.json();
}

// POST /user_drinks(.:format) user_drinks#create
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
