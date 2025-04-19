import { useEffect, useState } from "react";
import { Box, Button, Flex, Grid, Text } from "@chakra-ui/react";
import { getDrinks, getStatus } from "../api";
import DrinkBox from "./DrinkBox";

function AuthenticatedView({ user, onLogout }) {
  const [drinks, setDrinks] = useState([]);
  const [remainingDrinks, setRemainingDrinks] = useState({});
  const [caffeineLastDay, setCaffeineLastDay] = useState(0)

  const fetchStatus = async () => {
    try {
      const status = await getStatus();
      setRemainingDrinks(status.drinks_left);
      setCaffeineLastDay(status.caffeine_status.last_day)
    } catch (err) {
      console.error("Failed to fetch drinks");
    }
  };

  const fetchDrinks = async () => {
    try {
      const drinksData = await getDrinks();
      setDrinks(drinksData);
    } catch (err) {
      console.error("Failed to fetch drinks");
    }
  };

  const updateInfo = () => {
    fetchStatus();
  };

  useEffect(() => {
    fetchDrinks();
    fetchStatus();
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

      <Text align="center" p={4}>
        In the last day you've had {caffeineLastDay} mg of caffeine
      </Text>
      <Grid templateColumns="300px 200px 80px" gap={4} p={4}>
        {drinks.map((drink) => (
          <DrinkBox
            key={drink.id}
            drink={drink}
            quantity={remainingDrinks[drink.id]}
            onEmit={updateInfo}
          />
        ))}
      </Grid>
    </Box>
  );
}

export default AuthenticatedView;
