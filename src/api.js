const API_BASE = "http://localhost:3000";

function getToken() {
  return localStorage.getItem("token");
}

export async function getMe() {
  const headers = { headers: { Authorization: `Bearer ${getToken()}` } };
  const response = await fetch(`${API_BASE}/me`, headers);

  if (!response.ok) {
    console.log("Threw error");
    throw new Error("Failed to fetch user");
  }
  return await response.json();
}

export async function getStatus() {
  const headers = { headers: { Authorization: `Bearer ${getToken()}` } };
  const response = await fetch(`${API_BASE}/status`, headers);

  if (!response.ok) {
    throw new Error("Failed to fetch drinks");
  }
  return await response.json();
}

export async function getDrinks() {
  const headers = { headers: { Authorization: `Bearer ${getToken()}` } };
  const response = await fetch(`${API_BASE}/drinks`, headers);

  if (!response.ok) {
    throw new Error("Failed to fetch drinks");
  }
  return await response.json();
}

export async function takeDrink(drinkId) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
  const body = { drink_id: drinkId };
  const response = await fetch(`${API_BASE}/user_drinks`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Drink creation failed");
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
  const parsedResponse = await response.json();
  localStorage.setItem("token", parsedResponse.token);
  localStorage.setItem("user", JSON.stringify(parsedResponse.user));

  return parsedResponse;
}
