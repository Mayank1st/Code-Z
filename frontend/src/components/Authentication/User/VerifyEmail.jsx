"use client";

import { Center, Heading, useToast } from "@chakra-ui/react";
import {
  Button,
  FormControl,
  Flex,
  Input,
  Stack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const toast = useToast();
  const navigate = useNavigate();

  return (
    <Flex
      minH={"80vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={6}
        w={"full"}
        maxW={"sm"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={10}
      >
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Verify your Email
          </Heading>
        </Center>
        <Center
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          We have sent a code to your email
        </Center>
        <Formik
          initialValues={{ email: "", otp: "" }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await axiosInstance.post("/user/verify-email", {
                email: values.email,
                otp: values.otp,
              });
              toast({
                title: "Email Verified!",
                description: response.data.message || "Success",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
              navigate("/login");
            } catch (error) {
              toast({
                title: "Verification Failed",
                description:
                  error.response?.data?.message || "An error occurred",
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, handleChange, isSubmitting }) => (
            <Form>
              <FormControl mb={4}>
                <Field name="email">
                  {({ field }) => (
                    <Input
                      {...field}
                      placeholder="your-email@example.com"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      _placeholder={{ color: "gray.500" }}
                    />
                  )}
                </Field>
              </FormControl>
              <FormControl mb={4}>
                <Center>
                  <HStack spacing={2}>
                    <PinInput
                      onChange={(value) => {
                        values.otp = value; // Update OTP in Formik values
                      }}
                    >
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                    </PinInput>
                  </HStack>
                </Center>
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
                  Verify
                </Button>
              </Center>
            </Form>
          )}
        </Formik>
      </Stack>
    </Flex>
  );
}
