import { useEffect, useState } from "react";
import {
  Box,
  Button,
  ChakraProvider,
  CSSReset,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";

const API_BASE = "http://localhost:3000";

function AuthModal({ isOpen, onClose, setUser, type }) {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const endpoint = type === "signup" ? "/users" : "/auth/login";
    fetch(`${API_BASE}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          setUser(data.user);
          onClose();
        }
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{type === "signup" ? "Sign up" : "Login"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input name="username" onChange={handleChange} />
            </FormControl>
            {type === "signup" && (
              <>
                <FormControl isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input name="first_name" onChange={handleChange} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input name="last_name" onChange={handleChange} />
                </FormControl>
              </>
            )}
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input name="password" type="password" onChange={handleChange} />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmit} colorScheme="blue">
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function UnauthenticatedView({ setUser }) {
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const {
    isOpen: isSignupOpen,
    onOpen: onSignupOpen,
    onClose: onSignupClose,
  } = useDisclosure();

  return (
    <Box>
      <Flex justify="space-between" p={4} shadow="md">
        <Box />
        <Flex gap={4}>
          <Button onClick={onLoginOpen}>Login</Button>
          <Button onClick={onSignupOpen}>Sign up</Button>
        </Flex>
      </Flex>

      <Flex justify="center" align="center" height="80vh">
        <Image
          src="https://via.placeholder.com/800x400"
          alt="Welcome image"
          maxH="60vh"
        />
      </Flex>

      <AuthModal
        isOpen={isLoginOpen}
        onClose={onLoginClose}
        setUser={setUser}
        type="login"
      />
      <AuthModal
        isOpen={isSignupOpen}
        onClose={onSignupClose}
        setUser={setUser}
        type="signup"
      />
    </Box>
  );
}

function AuthenticatedView({ user, onLogout, drinks }) {
  return (
    <Box>
      <Flex justify="space-between" p={4} shadow="md">
        <Box />
        <Text fontWeight="bold">
          {user.first_name} {user.last_name}
        </Text>
        <Button onClick={onLogout}>Logout</Button>
      </Flex>

      <Flex direction="column" align="center" p={4} gap={4}>
        {drinks.map((drink) => (
          <Box
            key={drink.id}
            p={4}
            borderWidth="1px"
            borderRadius="md"
            shadow="md"
          >
            <Text fontSize="lg" fontWeight="bold">
              {drink.name}
            </Text>
            <Text>Caffeine per serving: {drink.serv_caffeine}mg</Text>
            <Text>Number of servings: {drink.serv_count}</Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}

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
