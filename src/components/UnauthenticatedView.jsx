import { Box, Button, Flex, Image, useDisclosure } from "@chakra-ui/react";
import AuthModal from "./AuthModal";

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

export default UnauthenticatedView;
