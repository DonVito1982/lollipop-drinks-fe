import { useEffect, useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { getDrinks } from "../api";
import DrinkBox from "./DrinkBox"

function AuthenticatedView({ user, onLogout }) {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const token = localStorage.getItem("token");
        const drinksData = await getDrinks(token);
        setDrinks(drinksData);
      } catch (err) {
        console.err("Failed to fetch drinks");
      }
    };

    fetchDrinks();
  }, []);

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
          <DrinkBox drink={drink} />
        ))}
      </Flex>
    </Box>
  );
}

export default AuthenticatedView;
