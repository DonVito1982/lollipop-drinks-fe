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
  Text,
  VStack,
} from "@chakra-ui/react";
import { signup, login } from "../api";

function AuthModal({ isOpen, onClose, setUser, type }) {
  const [form, setForm] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const data = type === "signup" ? await signup(form) : await login(form);

      if (data.token) {
        setUser(data.user);
        onClose();
        setErrorMessage(null);
      }
    } catch (error) {
      console.error(`${type} failed:`, error);
      setErrorMessage("Could not login");
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
            {errorMessage && (
              <Text color="red.500" mb={3}>
                {errorMessage}
              </Text>
            )}
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
