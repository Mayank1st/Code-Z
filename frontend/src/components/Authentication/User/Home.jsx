import React, { useState, useEffect } from "react";
import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  Image,
  Box,
  useBreakpointValue,
  keyframes,
} from "@chakra-ui/react";
import AboutDeveloper from "./DeveloperSection/AboutDeveloper";
import Features from "./Features";
import CookiePopup from "./CookiesSection/CookiePopup";
import HomeHeading from "./HomeHeading";
import "../../../styles/Home.css";

// Keyframe animation for text gradient effect
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const TypingText = () => {
  const texts = ["Collaborate", "Create", "Code Together"];
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 75; // Typing speed
  const pauseTime = 500; // Pause before deleting

  useEffect(() => {
    const handleTyping = () => {
      const currentText = texts[index];

      if (!isDeleting) {
        setDisplayText((prev) => currentText.substring(0, prev.length + 1));
      } else {
        setDisplayText((prev) => currentText.substring(0, prev.length - 1));
      }

      if (!isDeleting && displayText === currentText) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % texts.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index]);

  return (
    <Text
      fontWeight={700}
      lineHeight={1.2}
      fontSize={"4xl"}
      minHeight="48px" // Prevent button movement
      bgGradient="linear(to-r, teal.500, blue.500, purple.500)"
      bgClip="text"
      css={{
        animation: `${gradientAnimation} 5s linear infinite`,
      }}
    >
      CoDe-Z: {displayText}
    </Text>
  );
};

export default function WithBackgroundImage() {
  const breakpointValue = useBreakpointValue({ base: 4, md: 8 });
  const [showCookieConsent, setShowCookieConsent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCookieConsent(true);
    }, 1000); // Show cookie consent after 1 second

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <Box className="myTest">
      <Box>
        <HomeHeading />
      </Box>
      <Flex
        w={"full"}
        h={"100vh"}
        bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
      >
        <Flex
          w={"full"}
          maxW={"1200px"}
          mx="auto"
          flexDirection={{ base: "column", md: "row" }} // Responsive layout
          alignItems="center"
          justifyContent="space-between"
        >
          <VStack
            w={{ base: "100%", md: "50%" }} // 100% width on small screens, 50% on larger screens
            justify={"center"}
            px={breakpointValue}
            spacing={6}
          >
            <TypingText />
            <Stack direction={"row"}>
              <Button
                bgGradient="linear(to-r, teal.400, blue.400)"
                color={"white"}
                _hover={{ bgGradient: "linear(to-r, teal.500, blue.500)" }}
                rounded={"full"}
                px={6}
                py={3}
                boxShadow="md"
                transition="all 0.3s ease"
              >
                Start Coding
              </Button>
            </Stack>
          </VStack>
          <Flex
            w={{ base: "100%", md: "50%" }} // 100% width on small screens, 50% on larger screens
            justify="center"
            align="center"
          >
            <Image
              src="https://cdn.dribbble.com/users/1708816/screenshots/15637256/media/f9826f0af8a49462f048262a8502035b.gif"
              alt="CoDe-Z Visual"
              objectFit="cover" // Ensure the image covers the container without distortion
              borderRadius="md" // Optional: add some rounding to the corners
              maxH={{ base: "200px", md: "100%" }} // Limit height on small screens
              width="100%" // Make the image responsive
            />
          </Flex>
        </Flex>
      </Flex>
      <Box>
        <Features />
      </Box>
      <Box>
        <AboutDeveloper />
      </Box>

      {/* Cookie Consent Popup */}
      {/* {showCookieConsent && <CookiePopup />} */}
    </Box>
  );
}
