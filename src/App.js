import { useEffect, useState } from "react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import AuthenticatedView from "./components/AuthenticatedView";
import UnauthenticatedView from "./components/UnauthenticatedView";
import { getMe } from "./api";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function checkUser() {
      try {
        const userData = await getMe();
        setUser(userData);
      } catch (error) {
        localStorage.removeItem("token");
      }
    }
    if (token) {
      checkUser();
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
