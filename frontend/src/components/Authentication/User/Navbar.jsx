import React, { useState,useEffect } from "react";
import {
  Box,
  Flex,
  Button,
  Stack,
  Input,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  useDisclosure,
  useToast,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Center,
  useColorMode,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FcGoogle } from "react-icons/fc"; // Import Google icon
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../../redux/slices/authSlice";
import axiosInstance from "../../../utils/axiosInstance";
import Cookies from "js-cookie";
import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  console.log(user);

  // Login form handling
  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.post("/user/login", values);
        if (response.status === 200) {
          dispatch(login());
          toast({
            title: "Login Successful",
            description: response.data.message,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          navigate("/user-profile");
          onClose();
          loginFormik.resetForm();
        }
      } catch (error) {
        console.error("Error during login:", error);
        toast({
          title: "Login Error",
          description: error.response?.data?.message || "An error occurred.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Register form handling
  const registerFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.post("/user/register", values);
        if (response.status === 201) {
          toast({
            title: "Registration Successful",
            description: response.data.message,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          navigate("/verify-email");
          onClose();
          registerFormik.resetForm();
        }
      } catch (error) {
        console.error("Error during registration:", error);
        toast({
          title: "Registration Error",
          description: error.response?.data?.message || "An error occurred.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Handle logout
  const handleLogout = () => {
    Cookies.remove("is_auth");
    Cookies.remove("refreshToken");
    Cookies.remove("accessToken");
    localStorage.removeItem("is_auth");
    dispatch(logout());
    toast({
      title: "Logged out",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  // Google login handler
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/auth/google/callback");
        if (response.status === 200) {
          const googleAuthData = response.data.Data; // Assuming your response structure
          console.log("Google Auth Data:", googleAuthData); // Log the data

          // Dispatch login action with googleAuthData
          dispatch(login(googleAuthData));

          // Redirect to the desired page
          navigate("/"); // Or any page you want
        }
      } catch (error) {
        console.error("Error fetching Google Auth Data:", error);
      }
    };

    fetchData();
  }, [dispatch, navigate]);

  return (
    <>
      <Box bg={useColorModeValue("white", "gray.800")} px={4} shadow="md">
        <Flex
          className="container"
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box>
            <Link to={"/"}>
              <img src={logo} alt="Logo" width="120" height="40" />
            </Link>
          </Box>
          <HStack spacing={4} display={{ base: "none", md: "flex" }}>
            <Button variant="link" onClick={() => navigate("/code-editor")}>
              IDE
            </Button>
            <Button variant="link" onClick={() => navigate("/about")}>
              About
            </Button>
            <Button variant="link" onClick={() => navigate("/courses")}>
              Courses
            </Button>
            <Button colorScheme="teal" onClick={() => navigate("/upgrade")}>
              Upgrade to Pro
            </Button>
          </HStack>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              {!isLoggedIn && (
                <Button onClick={onOpen}>Login / Register</Button>
              )}
              {isLoggedIn && (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={
                        user.avatar ||
                        "https://avatars.dicebear.com/api/male/username.svg"
                      }
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={
                          user.avatar ||
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </Center>
                    <Center>
                      <Text>{user.name || "Username"}</Text>
                    </Center>
                    <MenuDivider />
                    <MenuItem>Your Servers</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isLogin ? "Login" : "Register"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack
              spacing={4}
              as="form"
              onSubmit={
                isLogin ? loginFormik.handleSubmit : registerFormik.handleSubmit
              }
            >
              {!isLogin && (
                <Input
                  name="name"
                  placeholder="Name"
                  onChange={registerFormik.handleChange}
                  value={registerFormik.values.name}
                />
              )}
              <Input
                name="email"
                placeholder="Email"
                onChange={
                  isLogin
                    ? loginFormik.handleChange
                    : registerFormik.handleChange
                }
                value={
                  isLogin
                    ? loginFormik.values.email
                    : registerFormik.values.email
                }
              />
              <Input
                name="password"
                placeholder="Password"
                type="password"
                onChange={
                  isLogin
                    ? loginFormik.handleChange
                    : registerFormik.handleChange
                }
                value={
                  isLogin
                    ? loginFormik.values.password
                    : registerFormik.values.password
                }
              />
              {!isLogin && (
                <Input
                  name="password_confirmation"
                  placeholder="Confirm Password"
                  type="password"
                  onChange={registerFormik.handleChange}
                  value={registerFormik.values.password_confirmation}
                />
              )}

              <ModalFooter>
                <Button onClick={onClose}>Close</Button>
                <Button
                  colorScheme="blue"
                  type="submit"
                  ml={3}
                  isLoading={isLoading}
                  loadingText={isLogin ? "Logging in..." : "Registering..."}
                >
                  {isLogin ? "Login" : "Register"}
                </Button>
              </ModalFooter>
            </Stack>
            <Box mt={2}>
              <Button
                leftIcon={<FcGoogle />}
                colorScheme="teal"
                variant="outline"
                width="full"
                onClick={handleGoogleLogin}
              >
                Login with Google
              </Button>
            </Box>

            <Text mt={4} textAlign="center">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Sign Up" : "Login"}
              </Button>
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Navbar;
