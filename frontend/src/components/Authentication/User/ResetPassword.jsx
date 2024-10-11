"use client";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";

export default function ResetPassword() {
  return (
    <Flex
      minH={"80vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={6} // Increased spacing for better separation
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={9} // Adjusted padding for better internal spacing
        my={12}
      >
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Enter New Password
          </Heading>
        </Center>

        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            // Handle form submission here
            console.log("Email:", values.email);
            console.log("New Password:", values.password);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Field name="email">
                  {({ field }) => (
                    <Input
                      {...field}
                      placeholder="your-email@example.com"
                      _placeholder={{ color: "gray.500" }}
                      type="email"
                      variant="outline" // Added variant for consistency
                      size="lg" // Increased size for better touch targets
                      mb={4} // Added margin-bottom for spacing between inputs
                    />
                  )}
                </Field>
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Field name="password">
                  {({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter new password"
                      type="password"
                      variant="outline" 
                      size="lg" 
                      mb={4} 
                    />
                  )}
                </Field>
              </FormControl>

              <Button
                type="submit"
                bg={"blue.400"}
                color={"white"}
                isLoading={isSubmitting}
                _hover={{
                  bg: "blue.500",
                }}
                size="lg" // Increased button size for better accessibility
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Stack>
    </Flex>
  );
}
