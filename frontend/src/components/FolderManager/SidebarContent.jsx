// SidebarContent.jsx
import React from 'react';
import {
  Box,
  Flex,
  IconButton,
  VStack,
  Editable,
  EditableInput,
  EditablePreview,
  Icon,
  HStack,
  Button,
  useColorModeValue
} from '@chakra-ui/react';
import { FiFolder, FiFileText, FiTrash, FiPlus } from 'react-icons/fi';

function SidebarContent({ structure, setStructure, onFileSelect }) {
  const handleNameChange = (index, newName, type, folderIndex) => {
    const updatedStructure = [...structure];
    if (type === "file") {
      updatedStructure[folderIndex].files[index].name = newName;
    } else {
      updatedStructure[index].name = newName;
    }
    setStructure(updatedStructure);
  };

  const addFolder = () => {
    setStructure([...structure, { name: "New Folder", type: "folder", files: [] }]);
  };

  const addFile = (folderIndex) => {
    const updatedStructure = [...structure];
    updatedStructure[folderIndex].files.push({ name: "New File", type: "file", content: "" });
    setStructure(updatedStructure);
  };

  const deleteFileOrFolder = (index, type, folderIndex) => {
    let updatedStructure = [...structure];
    if (type === "file") {
      updatedStructure[folderIndex].files.splice(index, 1);
    } else {
      updatedStructure.splice(index, 1);
    }
    setStructure(updatedStructure);
  };

  return (
    <VStack align="start" spacing={4} width="100%">
      {/* Add Folder button */}
      <Button
        leftIcon={<FiPlus />}
        onClick={addFolder}
        size="sm"
        mb={4}
        colorScheme="blue"
      >
        Add Folder
      </Button>

      {/* Folder and File Structure */}
      {structure.map((folder, folderIndex) => (
        <Box key={folderIndex} width="100%">
          <Flex align="center" justify="space-between" mb={2}>
            <HStack align="center" spacing={2}>
              {/* Folder Icon */}
              <Icon as={FiFolder} color={useColorModeValue("black", "white")} />
              <Editable
                defaultValue={folder.name}
                onSubmit={(newName) => handleNameChange(folderIndex, newName, "folder")}
                flex="1"
              >
                <EditablePreview />
                <EditableInput />
              </Editable>
            </HStack>
            <IconButton
              icon={<FiTrash />}
              aria-label="Delete Folder"
              size="sm"
              onClick={() => deleteFileOrFolder(folderIndex, "folder")}
              bg={useColorModeValue("red.200", "red.600")}
              _hover={{ bg: useColorModeValue("red.300", "red.700") }}
            />
          </Flex>

          <VStack align="start" pl={6} spacing={2} width="100%">
            {folder.files.map((file, fileIndex) => (
              <Flex key={fileIndex} align="center" justify="space-between" width="100%">
                <HStack align="center">
                  {/* File Icon */}
                  <Icon as={FiFileText} color={useColorModeValue("black", "white")} />
                  <Editable
                    defaultValue={file.name}
                    onSubmit={(newName) => handleNameChange(fileIndex, newName, "file", folderIndex)}
                    flex="1"
                    onClick={() => onFileSelect(folderIndex, fileIndex)} // Handle file selection
                  >
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                </HStack>
                <IconButton
                  icon={<FiTrash />}
                  aria-label="Delete File"
                  size="sm"
                  onClick={() => deleteFileOrFolder(fileIndex, "file", folderIndex)}
                  bg={useColorModeValue("red.200", "red.600")}
                  _hover={{ bg: useColorModeValue("red.300", "red.700") }}
                />
              </Flex>
            ))}

            {/* Add File Button */}
            <Button
              leftIcon={<FiPlus />}
              onClick={() => addFile(folderIndex)}
              size="sm"
              colorScheme="green"
            >
              Add File
            </Button>
          </VStack>
        </Box>
      ))}
    </VStack>
  );
}

export default SidebarContent;
