import { Box, Button, Flex, Text } from "@chakra-ui/react";

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

export default AuthenticatedView;
