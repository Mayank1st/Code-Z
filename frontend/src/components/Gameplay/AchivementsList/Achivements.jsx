import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Stack,
  Image,
  useColorModeValue,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';

const AchievementCard = ({ title, description, image }) => {
  return (
    <Box
      role={'group'}
      p={2} // Reduced padding
      maxW={'200px'} // Decreased max width for 4 cards in a row
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'md'}
      rounded={'lg'}
      pos={'relative'}
      zIndex={1}
      alignSelf="center" // Center the card within the grid cell
    >
      <Box
        rounded={'lg'}
        pos={'relative'}
        height={'40px'} // Adjust height for the image container
        display="flex" // Use flexbox to center the image
        alignItems="center"
        justifyContent="center"
      >
        <Image
          rounded={'lg'}
          height={10} // Maintain the image height
          width={10} // Maintain the image width
          objectFit={'cover'} // Cover to maintain aspect ratio
          src={image}
          alt={title}
        />
      </Box>
      <Stack pt={1} align={'center'}>
        <Heading fontSize={'lg'} fontFamily={'body'} fontWeight={500} textAlign="center">
          {title}
        </Heading>
        <Text color={'gray.600'} textAlign="center" mt={1}>
          {description}
        </Text>
      </Stack>
    </Box>
  );
};

function Achievements() {
  const IMAGE =
    'https://www.svgrepo.com/show/235315/badge.svg';

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      p={5}
      bg={useColorModeValue('gray.50', 'gray.800')}
      borderRadius="md"
      boxShadow="lg"
      minH="auto"
    >
      <Box
        w="100%"
        p={4}
        bg={useColorModeValue('white', 'gray.700')}
        borderRadius="md"
        boxShadow="md"
      >
    
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5} columnGap={5} alignItems="flex-start">
          <AchievementCard title="Achievement 1" description="Description for achievement 1." image={IMAGE} />
          <AchievementCard title="Achievement 2" description="Description for achievement 2." image={IMAGE} />
          <AchievementCard title="Achievement 3" description="Description for achievement 3." image={IMAGE} />
          <AchievementCard title="Achievement 4" description="Description for achievement 4." image={IMAGE} />
        </SimpleGrid>
      </Box>
    </Flex>
  );
}

export default Achievements;
