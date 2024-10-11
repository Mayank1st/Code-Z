import React, { useEffect } from "react"; // Import React and useEffect
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  HStack, // Import HStack for horizontal alignment
} from "@chakra-ui/react";
import { LANGUAGE_VERSIONS } from "../../utils/constants";
import { ChevronDownIcon } from "@chakra-ui/icons";

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = "blue.400";
const INACTIVE_COLOR = "gray.300";

const LanguageSelector = ({ language, onSelect, onSave, isSaving }) => {
  const menuListBg = useColorModeValue("gray.100", "gray.900");
  const activeItemBg = useColorModeValue("gray.200", "gray.800");

  // Handle the keydown event
  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === "s") {
      event.preventDefault(); 
      onSave(); // Call the save function
    }
  };

  useEffect(() => {
    // Add the keydown event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Box
      p={4}
      borderRadius="md"
      shadow="md"
      bg={useColorModeValue("white", "gray.800")}
    >
      <Text mb={2} fontSize="lg" fontWeight="bold">
        Language:
      </Text>
      <HStack spacing={4} alignItems="center"> {/* Adjusted spacing and alignment */}
        <Menu isLazy>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            bg={useColorModeValue("white", "gray.800")} // Background for button
            borderColor={useColorModeValue("gray.300", "gray.600")} // Border color for button
            borderWidth={1}
            _hover={{
              bg: useColorModeValue("gray.200", "gray.700"), // Hover background
            }}
          >
            {language}
          </MenuButton>
          <MenuList bg={menuListBg}>
            {languages.map(([lang, version]) => (
              <MenuItem
                key={lang}
                color={lang === language ? ACTIVE_COLOR : INACTIVE_COLOR} // Updated inactive color
                bg={lang === language ? activeItemBg : "transparent"}
                _hover={{
                  color: ACTIVE_COLOR,
                  bg: useColorModeValue("gray.200", "gray.800"), // Hover background
                }}
                onClick={() => onSelect(lang)}
                _focus={{
                  bg: useColorModeValue("gray.200", "gray.800"), // Focus background
                }}
              >
                {lang}
                &nbsp;
                <Text as="span" color="gray.600" fontSize="sm">
                  ({version})
                </Text>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <Button
          variant="outline"
          colorScheme="green"
          onClick={onSave} // Handle save action
          isLoading={isSaving} // Show spinner when saving
          loadingText="Saving..." // Text to display while loading
          size="md" // Larger button size for better visibility
          borderRadius="md" // Rounded corners for the button
        >
          Save
        </Button>
      </HStack>
    </Box>
  );
};

export default LanguageSelector;
