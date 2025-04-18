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
import { signup, login } from "../api";

function AuthModal({ isOpen, onClose, setUser, type }) {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const data = type === "signup" ? await signup(form) : await login(form);

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        onClose();
      }
    } catch (error) {
      console.error(`${type} failed:`, error);
    }
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
