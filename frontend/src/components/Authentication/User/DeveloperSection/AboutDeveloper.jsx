import {
  Container,
  Text,
  VStack,
  Stack,
  Avatar,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaQuoteRight } from "react-icons/fa";

// Testimonial attributes without TypeScript interfaces
const testimonial = {
  username: "Mayank Kumar",
  position: "Full Stack Web Developer",
  image:
    "https://c8.alamy.com/comp/2D7N88J/young-freelancer-programmer-coding-with-laptop-vector-geek-character-isolated-on-white-background-illustration-of-programmer-coding-freelancer-professional-2D7N88J.jpg",
  content: `Hello, I'm Mayank Kumar, the creator of Code-Z—a collaborative coding platform where users can seamlessly code and invite friends for real-time collaboration. My mission is to make coding more accessible and enjoyable, utilizing modern technologies like React, Node.js, and Gemini AI. Join me in revolutionizing the coding experience!`,
};

const TestimonialCard = () => {
  return (
    <Container maxW="5xl" p={{ base: 10, md: 14 }}>
      <VStack
        spacing={3}
        p={4}
        bg={useColorModeValue("white", "blackAlpha.600")}
        border="3px solid"
        borderColor="green.400"
        maxW="xl"
        margin="0 auto"
        boxShadow="lg"
        pos="relative"
      >
        <Icon
          as={FaQuoteRight}
          w={10}
          h={10}
          color="green.400"
          left="-1.3rem"
          position="absolute"
          top="-1.5rem"
        />
        <Stack direction="column" spacing={5}>
          <Text color="gray.500">
            {testimonial.content}
          </Text>
          <Text color="gray.500">Thanks to Ahmad, I got a frontend job!</Text>
          <Text
            fontWeight="bold"
            fontSize="lg"
            align="right"
            mr="3rem !important"
          >
            {testimonial.username}
          </Text>
        </Stack>
        <Avatar
          name="avatar"
          src={testimonial.image}
          showBorder={true}
          borderColor="green.400"
          size="xl"
          pos="absolute"
          right="-48px"
          bottom="-20px"
          shadow="lg"
        />
      </VStack>
    </Container>
  );
};

export default TestimonialCard;
