"use client";

import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";

export default function ForgotPassword() {
  return (
    <Flex
      minH={"80vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Forgot your password?
          </Heading>
        </Center>
        <Center>
          <Text
            fontSize={{ base: "sm", sm: "md" }}
            color={useColorModeValue("gray.800", "gray.400")}
            textAlign="center"
          >
            You&apos;ll get an email with a reset link
          </Text>
        </Center>

        <Formik
          initialValues={{ email: "" }}
          onSubmit={(values) => {
            // Handle the form submission
            console.log("Reset link sent to:", values.email);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormControl id="email" isRequired>
                <Field name="email">
                  {({ field }) => (
                    <Input
                      {...field}
                      placeholder="your-email@example.com"
                      _placeholder={{ color: "gray.500" }}
                      type="email"
                      mb={4} // Add margin-bottom for spacing
                    />
                  )}
                </Field>
              </FormControl>
              <Center>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  isLoading={isSubmitting}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Request Reset
                </Button>
              </Center>
            </Form>
          )}
        </Formik>
      </Stack>
    </Flex>
  );
}
