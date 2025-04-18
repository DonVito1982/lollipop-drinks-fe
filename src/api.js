const API_BASE = "http://localhost:3000";

export async function getDrinks(token) {
  const headers = {headers: {Authorization: `Bearer ${token}`}}
  const response = await fetch(`${API_BASE}/drinks`, headers)
  console.log("d")
  console.log(response)

  if (!response.ok) {
    throw new Error("Failed to fetch drinks")
  }
  return await response.json();
}
