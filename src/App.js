import { useEffect, useState } from "react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import AuthenticatedView from "./components/AuthenticatedView";
import UnauthenticatedView from "./components/UnauthenticatedView";

const API_BASE = "http://localhost:3000";

function App() {
  const [user, setUser] = useState(null);
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
      fetch(`${API_BASE}/drinks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setDrinks);
    }
  }, []);

  return (
    <ChakraProvider>
      <CSSReset />
      {user ? (
        <AuthenticatedView
          user={user}
          onLogout={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
          }}
          drinks={drinks}
        />
      ) : (
        <UnauthenticatedView setUser={setUser} />
      )}
    </ChakraProvider>
  );
}

export default App;
