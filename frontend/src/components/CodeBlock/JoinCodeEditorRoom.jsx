import React, { useEffect, useRef, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Text, VStack, Icon } from "@chakra-ui/react";
import { FaUserFriends, FaRegIdBadge } from "react-icons/fa";
import { io } from "socket.io-client";

const JoinCodeEditorRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const socket = useMemo(() => io("http://https://code-z-s4gj.onrender.com"), []); // Use useMemo for socket

  // Function to get query parameters
  const getQueryParams = (search) => {
    const params = new URLSearchParams(search);
    return {
      roomId: params.get("roomId"),
      participentEmail: params.get("participentEmail"),
    };
  };

  // Get roomId and participantEmail from URL
  const { roomId, participentEmail } = getQueryParams(location.search);

  const handleRedirect = () => {
    navigate(`/code-editor?roomId=${roomId}&participentEmail=${participentEmail}`);
  };

  return (
    <VStack
      justify="center"
      align="center"
      height="100vh"
      bgGradient={[
        "linear(to-r, teal.500, blue.500)",
        "linear(to-r, gray.900, gray.800)",
      ]}
      spacing={6}
      p={5}
    >
      <Box
        bg="white"
        color="gray.800"
        borderRadius="md"
        boxShadow="md"
        p={8}
        textAlign="center"
        width={["90%", "70%", "50%"]}
        borderWidth="1px"
        borderColor="gray.200"
        _dark={{
          bg: "gray.800",
          color: "white",
          borderColor: "gray.600",
        }}
      >
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Join Code Editor Room
        </Text>
        <Box display="flex" alignItems="center" mb={3}>
          <Icon as={FaRegIdBadge} boxSize={6} color="teal.400" />
          <Text fontSize="lg" ml={2}>
            Room ID: {roomId}
          </Text>
        </Box>
        <Box display="flex" alignItems="center" mb={5}>
          <Icon as={FaUserFriends} boxSize={6} color="teal.400" />
          <Text fontSize="lg" ml={2}>
            Participant Email: {participentEmail}
          </Text>
        </Box>
        <Button
          colorScheme="teal"
          size="lg"
          onClick={handleRedirect}
          rightIcon={<Icon as={FaUserFriends} />}
        >
          Join Room
        </Button>
      </Box>
    </VStack>
  );
};

export default JoinCodeEditorRoom;
