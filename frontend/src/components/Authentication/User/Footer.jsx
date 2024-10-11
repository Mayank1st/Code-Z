'use client'

import {
  Box,
  chakra,
  Container,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  IconButton,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { BiMailSend } from 'react-icons/bi';
import { useState } from 'react';



const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    // Handle subscription logic
    console.log(`Email submitted: ${email}`);
    // Reset email or show success/error message
  };

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} p={4}>
      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <Stack spacing={6}>
            <Text>&copy; 2024 Your Company. All rights reserved.</Text>
            <Stack direction="row" spacing={4}>
              <IconButton aria-label="Instagram" icon={<FaInstagram />} />
              <IconButton aria-label="Twitter" icon={<FaTwitter />} />
              <IconButton aria-label="YouTube" icon={<FaYoutube />} />
            </Stack>
          </Stack>
          <Stack>
            <Text fontWeight="bold">Subscribe to our newsletter</Text>
            <Stack direction="row">
              <Input
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
              <Button onClick={handleSubscribe}>
                <VisuallyHidden>Subscribe</VisuallyHidden>
                <BiMailSend />
              </Button>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Footer;
