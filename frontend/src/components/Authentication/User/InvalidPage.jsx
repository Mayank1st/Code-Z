import React from 'react';
import { Box, Heading, Text, Button, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function InvalidPage() {
  const navigate = useNavigate();
  
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.800")}
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Heading
        as="h1"
        size="2xl"
        color={useColorModeValue("gray.800", "white")}
        mb={4}
      >
        404 - Page Not Found
      </Heading>
      <Text
        fontSize="lg"
        color={useColorModeValue("gray.600", "gray.300")}
        mb={6}
        textAlign="center"
      >
        Sorry, the page you are looking for does not exist. You may have mistyped the address or the page may have moved.
      </Text>
      <Button
        colorScheme="blue"
        onClick={() => navigate("/")}
      >
        Go to Home
      </Button>
    </Box>
  );
}

export default InvalidPage;
