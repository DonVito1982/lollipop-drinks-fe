import { Box, Button, Text } from "@chakra-ui/react";
import { takeDrink } from "../api";

function DrinkBox({ drink, quantity, onEmit }) {
  const handleTake = async () => {
    await takeDrink(drink.id);
    onEmit();
  };

  const drinkText =
    quantity > 0
      ? `You can have ${quantity} more of these`
      : "You cannot have anymore of these";

  return (
    <>
      <Box key={drink.id} p={4} borderWidth="1px" borderRadius="md" shadow="md">
        <Text fontSize="lg" fontWeight="bold">
          {drink.name}
        </Text>
        <Text>Caffeine per serving: {drink.serv_caffeine} mg</Text>
        <Text>Number of servings: {drink.serv_count}</Text>
      </Box>
      <Box>
        <Text>{drinkText}</Text>
      </Box>
      <Button onClick={handleTake} isDisabled={quantity === 0}>
        Take one
      </Button>
    </>
  );
}

export default DrinkBox;
