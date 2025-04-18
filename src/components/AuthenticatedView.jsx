import { useEffect, useState } from "react";
import { Box, Button, Flex, Grid, Text } from "@chakra-ui/react";
import { getDrinks, getStatus, takeDrink } from "../api";
import DrinkBox from "./DrinkBox";

function DrinkButton({ drinkId, onEmit }) {
  const handleTake = () => {
    takeDrink(drinkId)
    onEmit()
  }
  return <Button onClick={handleTake}>Take one</Button>;
}

function AuthenticatedView({ user, onLogout }) {
  const [drinks, setDrinks] = useState([]);
  const [drinkStatus, setDrinkStatus] = useState({});

  const fetchStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const status = await getStatus(token);
      setDrinkStatus(status.drinks_left);
      // setDrinks(drinksData);
    } catch (err) {
      console.err("Failed to fetch drinks");
    }
  };

  const fetchDrinks = async () => {
    try {
      const token = localStorage.getItem("token");
      const drinksData = await getDrinks(token);
      setDrinks(drinksData);
    } catch (err) {
      console.err("Failed to fetch drinks");
    }
  };

  const updateInfo = async () => {
    console.log("Updating in main")
  }

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
        Some text
      </Text>
      <Grid templateColumns="300px 200px 90px" gap={4} p={4}>
        {drinks.map((drink) => (
          <>
            <DrinkBox key={drink.id} drink={drink} />
            <Box>
              <Text>You can have {drinkStatus[drink.id]} more of these</Text>
            </Box>
            <DrinkButton drinkId={drink.id} onEmit={updateInfo} />
          </>
        ))}
      </Grid>
    </Box>
  );
}

export default AuthenticatedView;
