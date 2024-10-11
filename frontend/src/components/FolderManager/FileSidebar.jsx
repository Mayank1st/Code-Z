import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiOutlineFolder, AiOutlineFileAdd } from "react-icons/ai";

const FileSidebar = ({ files, onFileSelect, onAddFile }) => {
  const bgColor = useColorModeValue("gray.50", "gray.700"); 

  const handleFileSelect = (fileName) => {
    onFileSelect(fileName);
  };

  return (
    <Box
      w="250px"
      borderRightWidth="1px"
      borderColor="gray.200"
      p={4}
      bg={bgColor} 
    >
      <Flex align="center" mb={4}>
        <IconButton
          icon={<AiOutlineFileAdd />}
          aria-label="Add File"
          onClick={onAddFile}
        />
        <Text fontSize="lg" fontWeight="bold" ml={2}>
          Files
        </Text>
      </Flex>
      <VStack spacing={2} align="stretch">
        {files.map((file, index) => (
          <Button
            key={index}
            variant="outline"
            onClick={() => handleFileSelect(file.name)}
            justifyContent="flex-start"
            width="100%"
          >
            <AiOutlineFolder />
            <Text ml={2}>{file.name}</Text>
          </Button>
        ))}
      </VStack>
    </Box>
  );
};

export default FileSidebar;
