import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Flex,
  Icon,
  Text,
  Link as RouterLink,
  Button,
  Heading,
  VStack,
  Drawer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  DrawerContent,
  IconButton,
  useDisclosure,
  DrawerOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  AiOutlineTeam,
  AiOutlineHome,
  AiOutlineUsergroupAdd,
  AiOutlineTrophy,
} from "react-icons/ai";
import { BsFolder2 } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { RiFlashlightFill } from "react-icons/ri";
import { SiAmazongames } from "react-icons/si";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import Games from "../../Gameplay/GameList/games";
import Achivements from "../../Gameplay/AchivementsList/Achivements";
import { BiGroup } from "react-icons/bi";
import CodeIDE from "../../CodeBlock/RedirectToCodeEditor";

export default function UserProfile() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);
  const [selectedItem, setSelectedItem] = useState("IDE");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosInstance.get("/user/me");
        setUserData(response.data.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }
    fetchData();
  }, []);

  // Handling logout
  const handleLogout = () => {
    Cookies.remove("is_auth");
    Cookies.remove("refreshToken");
    Cookies.remove("accessToken");
    localStorage.removeItem("is_auth");
    dispatch(logout());
    navigate("/");
  };

  // Render main content based on selected item
  let mainContent;
  switch (selectedItem) {
    case "CreateRoom":
      mainContent = <CreateRoomComponent />; // Updated to CreateRoomComponent
      break;
    case "My Games":
      mainContent = <MyGamesComponent />;
      break;
    case "Achievements":
      mainContent = <AchievementsComponent />;
      break;
    case "Friends List":
      mainContent = <FriendsListComponent />;
      break;
    case "IDE":
      mainContent = <LeaderboardComponent />;
      break;
    default:
      mainContent = <LeaderboardComponent />;
  }

  return (
    <Box
      as="section"
      bg={useColorModeValue("gray.50", "gray.800")}
      minH="100vh"
    >
      <SidebarContent
        display={{ base: "none", md: "unset" }}
        handleLogout={handleLogout}
        onSelect={setSelectedItem}
      />
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent
            w="full"
            borderRight="none"
            handleLogout={handleLogout}
            onSelect={setSelectedItem}
          />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          w="full"
          px="4"
          d={{ base: "flex", md: "none" }}
          borderBottomWidth="1px"
          borderColor={useColorModeValue("gray.200", "gray.700")}
          bg={useColorModeValue("white", "gray.800")}
          justifyContent={{ base: "space-between", md: "flex-end" }}
          boxShadow="lg"
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: "inline-flex", md: "none" }}
            onClick={onOpen}
            icon={<FiMenu />}
            size="md"
          />
          <Flex align="center">
            <Icon as={RiFlashlightFill} h={8} w={8} color="blue.400" />
          </Flex>
        </Flex>

        <Box
          as="main"
          p={8}
          minH="30rem"
          bg={useColorModeValue("white", "gray.800")}
          borderRadius="md"
          boxShadow="md"
        >
          {mainContent} {/* Render the selected component here */}
        </Box>
      </Box>
    </Box>
  );
}

const SidebarContent = ({ handleLogout, onSelect, ...props }) => (
  <Box
    as="nav"
    pos="fixed"
    top="0"
    left="0"
    zIndex="sticky"
    h="full"
    overflowX="hidden"
    overflowY="auto"
    bg={useColorModeValue("white", "gray.800")}
    borderColor={useColorModeValue("inherit", "gray.700")}
    borderRightWidth="1px"
    w="60"
    {...props}
  >
    <VStack
      h="full"
      w="full"
      alignItems="flex-start"
      justifyContent="space-between"
    >
      <Box w="full">
        <Flex px="4" py="5" align="center">
          <Icon as={RiFlashlightFill} h={8} w={8} />
          <Text
            fontSize="2xl"
            ml="2"
            color={useColorModeValue("brand.500", "white")}
            fontWeight="semibold"
          >
            POS
          </Text>
        </Flex>
        <Flex
          direction="column"
          as="nav"
          fontSize="md"
          color="gray.600"
          aria-label="Main Navigation"
        >
          <NavItem icon={BiGroup} onSelect={onSelect}>
            Create Room
          </NavItem>
          <NavItem icon={SiAmazongames} onSelect={onSelect}>
            My Games
          </NavItem>
          <NavItem icon={BsFolder2} onSelect={onSelect}>
            Achievements
          </NavItem>
          <NavItem icon={AiOutlineUsergroupAdd} onSelect={onSelect}>
            Friends List
          </NavItem>
          <NavItem icon={AiOutlineTrophy} onSelect={onSelect}>
            IDE
          </NavItem>
        </Flex>
      </Box>

      <Flex px="4" py="5" mt={10} justifyContent="center" alignItems="center">
        <Menu>
          <MenuButton
            as={Button}
            size={"sm"}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
            _hover={{ textDecoration: "none" }}
          >
            <Avatar
              size={"sm"}
              name="Ahmad"
              src="https://avatars2.githubusercontent.com/u/37842853?v=4"
            />
          </MenuButton>
          <MenuList fontSize={17} zIndex={5555}>
            <MenuItem as={RouterLink}>
              <Link to="/profile-settings"> My Profile</Link>
            </MenuItem>
            <MenuItem as={RouterLink} to="#">
              Support
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </VStack>
  </Box>
);

const NavItem = ({ icon, children, onSelect }) => {
  const color = useColorModeValue("gray.600", "gray.300");

  return (
    <Flex
      align="center"
      px="5"
      py="4"
      cursor="pointer"
      role="group"
      fontWeight="semibold"
      transition=".15s ease"
      color={useColorModeValue("inherit", "gray.400")}
      onClick={() => onSelect(children)} // Update the selected item
      _hover={{
        bg: useColorModeValue("gray.100", "gray.900"),
        color: useColorModeValue("gray.900", "gray.200"),
      }}
    >
      {icon && (
        <Icon
          mx="2"
          boxSize="5"
          _groupHover={{
            color: color,
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
};

// Dummy components for demonstration purposes

const CreateRoomComponent = () => {
  return (
    <Box>
      <Heading
        className="create-room-heading"
        size="lg"
        textAlign={"center"}
        fontSize={"50px"}
      >
        Create Room
      </Heading>
      <div className="create-room-main-div p-1">{/* <CreateRoom /> */}</div>
    </Box>
  );
};

const MyGamesComponent = () => (
  <Box>
    <Heading size="lg">My Games</Heading>
    <div className="games-list-main-div">
      <Games />
    </div>
  </Box>
);

const AchievementsComponent = () => (
  <Box>
    <Heading size="lg">Achievements</Heading>
    <div className="achievements-list-main-div">
      <Achivements />
    </div>
  </Box>
);

const FriendsListComponent = () => (
  <Box>
    <Heading size="lg">Friends List</Heading>
    <Text>This section will list friends.</Text>
  </Box>
);

const LeaderboardComponent = () => (
  <Box>
    <Heading size="lg">IDE</Heading>
    <div className="codeBlock-list-main-div">
      <CodeIDE />
    </div>
  </Box>
);
