'use client';
import Link from 'next/link';
import { Box, Button, Container, Flex, Text, TextInput, useMantineTheme } from '@mantine/core';

export default function NewsletterSection() {
  const theme = useMantineTheme();

  return (
    <Box bg="pink" py="xl">
      <Container size="xl">
        <Flex
          justify="space-between"
          align="center"
          wrap="wrap"
          style={{ gap: theme.spacing.md }}
        >
          <Box>
            <Text fw={700} fz="lg" c="white">
              Stay updated on exciting giveaways, special offers, amazing events, and everything Fringe!
            </Text>
          </Box>
          <TextInput
            style={{ width: 350 }}
            radius="xl"
            size="md"
            placeholder="email@example.com"
            rightSectionWidth={90}
            rightSection={
              <Button color="purple" size="sm" radius="xl" component={Link} href="register" fw={700}>
             
                Sign Up
              
              </Button>
                }
          />
        </Flex>
      </Container>
    </Box>
  );
}
