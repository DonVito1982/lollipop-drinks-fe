import {
  Box,
  Button,
  Flex,
  Image,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import AuthModal from "./AuthModal";
import welcomeImage from "../assets/welcome.jpeg";

function UnauthenticatedView({ setUser }) {
  const toast = useToast();
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

  const welcomeUser = (user) => {
    setUser(user);
    toast({
      title: `Welcome ${user.first_name}!`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

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
        <Image src={welcomeImage} alt="Welcome image" maxH="60vh" />
      </Flex>

      <AuthModal
        isOpen={isLoginOpen}
        onClose={onLoginClose}
        setUser={welcomeUser}
        type="login"
      />
      <AuthModal
        isOpen={isSignupOpen}
        onClose={onSignupClose}
        setUser={welcomeUser}
        type="signup"
      />
    </Box>
  );
}

export default UnauthenticatedView;
