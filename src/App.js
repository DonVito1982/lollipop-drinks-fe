import { useEffect, useState } from "react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import AuthenticatedView from "./components/AuthenticatedView";
import UnauthenticatedView from "./components/UnauthenticatedView";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
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
        />
      ) : (
        <UnauthenticatedView setUser={setUser} />
      )}
    </ChakraProvider>
  );
}

export default App;
