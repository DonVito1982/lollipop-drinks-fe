import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  VStack,
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

export default AuthModal;
