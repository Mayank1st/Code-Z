import React from "react";
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Stack,
  Image,
  SimpleGrid,
  Flex,
  Text,
} from "@chakra-ui/react";

// New ProductSimple Card Component
const ProductSimple = ({ title, description, price, originalPrice }) => {
  const IMAGE =
    'https://www.svgrepo.com/show/501816/play-game.svg';

  return (
    <Center className="mt-3" py={6}> {/* Reduced vertical padding */}
      <Box
        role={'group'}
        p={4}
        maxW={'250px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'md'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
      >
        <Box
          rounded={'lg'}
          mt={-10}
          pos={'relative'}
          height={'50px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${IMAGE})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}
        >
          <Image
            rounded={'lg'}
            height={100}
            width={250}
            objectFit={'cover'}
            src={IMAGE}
            alt={title}
          />
        </Box>
        <Stack pt={5} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            Game
          </Text>
          <Heading fontSize={'xl'} fontFamily={'body'} fontWeight={500}>
            {title}
          </Heading>
          <Stack direction={'row'} align={'center'}>
            <Text fontWeight={800} fontSize={'lg'}>
              {price}
            </Text>
            <Text textDecoration={'line-through'} color={'gray.600'}>
              {originalPrice}
            </Text>
          </Stack>
          <Text color={'gray.600'} textAlign="center" mt={2}>
            {description}
          </Text>
        </Stack>
      </Box>
    </Center>
  );
};

function Games() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      p={5}
      bg={useColorModeValue("gray.50", "gray.800")}
      borderRadius="md"
      boxShadow="lg"
      minH="100vh"
    >

      {/* Ongoing Games Section */}
      <Box w="90%" mb={4} p={4} bg={useColorModeValue("white", "gray.700")} borderRadius="md" boxShadow="md">
        <Heading size="lg" mb={3}> {/* Reduced bottom margin */}
          Ongoing Games
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={1} columnGap={0}> {/* Reduced spacing and column gap */}
          <ProductSimple title="Ongoing Game 1" description="Description for ongoing game 1." price="$57" originalPrice="$199" />
          <ProductSimple title="Ongoing Game 2" description="Description for ongoing game 2." price="$45" originalPrice="$150" />
        </SimpleGrid>
      </Box>

      <hr />

      {/* Saved Games Section */}
      <Box w="90%" p={4} bg={useColorModeValue("white", "gray.700")} borderRadius="md" boxShadow="md">
        <Heading size="lg" mb={3}> {/* Reduced bottom margin */}
          Saved Games
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={1} columnGap={0}> {/* Reduced spacing and column gap */}
          <ProductSimple title="Saved Game 1" description="Description for saved game 1." price="$30" originalPrice="$100" />
          <ProductSimple title="Saved Game 2" description="Description for saved game 2." price="$40" originalPrice="$120" />
          <ProductSimple title="Saved Game 3" description="Description for saved game 3." price="$25" originalPrice="$75" />
        </SimpleGrid>
      </Box>
    </Flex>
  );
}

export default Games;
