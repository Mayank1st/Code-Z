"use client";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Flex,
  useColorModeValue,
  Text,
  Container,
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";

export default function AboutAccordion() {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Container>
        <Accordion allowMultiple width="100%" maxW="lg" rounded="lg">
          <AccordionItem>
            <AccordionButton
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p={4}
            >
              <Text fontSize="md">What is Code-Z?</Text>
              <ChevronDownIcon fontSize="24px" />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text color="gray.600">
                Code-Z is an innovative collaborative coding platform that
                enables developers to work together in real time. It offers a
                seamless environment for coding, sharing, and collaborating on
                projects, making it easier to bring ideas to life.
              </Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p={4}
            >
              <Text fontSize="md">What advantages to use?</Text>
              <ChevronDownIcon fontSize="24px" />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text color="gray.600">
                The primary advantage of using Code-Z is its real-time
                collaboration feature, which allows multiple users to edit code
                simultaneously. This fosters a sense of teamwork and enhances
                productivity. Additionally, the integration with AI tools
                streamlines coding tasks, saving time and effort.
              </Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p={4}
            >
              <Text fontSize="md">What are the features?</Text>
              <ChevronDownIcon fontSize="24px" />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text color="gray.600">
                Code-Z comes packed with features, including support for
                multiple programming languages, AI-powered code generation, and
                robust session management. It also offers responsive design,
                ensuring an optimal experience on any device, and user-friendly
                interfaces that make coding enjoyable for everyone.
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Container>
    </Flex>
  );
}
