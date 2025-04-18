import { Box, Text } from "@chakra-ui/react";

function DrinkBox({ drink }) {
  return (
    <Box key={drink.id} p={4} borderWidth="1px" borderRadius="md" shadow="md">
      <Text fontSize="lg" fontWeight="bold">
        {drink.name}
      </Text>
      <Text>Caffeine per serving: {drink.serv_caffeine} mg</Text>
      <Text>Number of servings: {drink.serv_count}</Text>
    </Box>
  );
}

export default DrinkBox;
