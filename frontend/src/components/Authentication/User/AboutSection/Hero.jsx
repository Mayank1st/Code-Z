import React from "react";
import {
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  Image,
  Skeleton,
  Box,
  Link,
} from "@chakra-ui/react";

const Hero = () => {
  return (
    <Container maxW="6xl" px={{ base: 6, md: 3 }} py={14}>
      <Stack direction={{ base: "column", md: "row" }} justifyContent="center">
        <Box mr={{ base: 0, md: 5 }} pos="relative">
          <DottedBox />
          <Image
            boxShadow="lg"
            w="100%"
            h="100%"
            minW={{ base: "auto", md: "30rem" }}
            maxH="20rem"
            objectFit="cover"
            src={`https://static.vecteezy.com/system/resources/thumbnails/028/584/892/small_2x/computer-programming-or-developing-software-animation-3d-rendering-of-flat-monitor-coding-3d-render-3d-computer-monitor-video.jpg`}
            rounded="md"
            fallback={<Skeleton />}
          />
        </Box>
        <Stack direction="column" spacing={6} justifyContent="center">
          <chakra.h1
            fontSize="5xl"
            lineHeight={1}
            fontWeight="bold"
            textAlign="left"
          >
            On a mission to Empower Your Coding Journey.
          </chakra.h1>
          <Box>
            <Content>
              Code-Z is a collaborative coding platform designed to bring
              developers together. It allows users to code in real-time, sharing
              ideas and working in sync effortlessly.
            </Content>
            <Content mt={4}>
              With AI-powered code generation through Gemini, developers can
              streamline their workflow. The platform supports multiple
              programming languages, making it versatile and adaptable to any
              project.
            </Content>
            <Content mt={4}>
              Our mission is to foster innovation and teamwork, giving creators
              the tools they need to collaborate efficiently. Whether coding
              solo or with friends, Code-Z makes it seamless and enjoyable.
            </Content>
          </Box>
          {/* <Link href="#" fontSize="sm" color="blue.400">
            See how people are using our components →
          </Link> */}
        </Stack>
      </Stack>
    </Container>
  );
};

const Content = ({ children, ...props }) => {
  return (
    <Text
      fontSize="md"
      textAlign="left"
      lineHeight="1.375"
      fontWeight="400"
      color="gray.500"
      {...props}
    >
      {children}
    </Text>
  );
};

function DottedBox() {
  return (
    <Box
      position="absolute"
      left="-45px"
      top="-30px"
      height="full"
      maxW="700px"
      zIndex={-1}
    >
      <svg
        color={useColorModeValue("rgba(55,65,81, 0.1)", "rgba(55,65,81, 0.7)")}
        width="350"
        height="420"
        fill="none"
      >
        <defs>
          <pattern
            id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
          </pattern>
        </defs>
        <rect
          width="404"
          height="404"
          fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
        ></rect>
      </svg>
    </Box>
  );
}

export default Hero;
