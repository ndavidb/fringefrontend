'use client';

import React from "react";  // Removed Component import
import Link from 'next/link';
import {
  TextInput,
  Button,
  Text,
  Box,
  Title,
  Image,
  Flex,
  Group,
  Container,
  useMantineTheme,
} from "@mantine/core";
import { IconUser } from '@tabler/icons-react';  // Removed IconSearch import

import AboutSection from "@/app/(public)/(home)/components/AboutSection";
import ContactSection from "@/app/(public)/(home)/components/ContactSection";
import NewsletterSection from "@/app/(public)/(home)/components/NewsletterSection";

export default function HomePage() {
  const theme = useMantineTheme();
  // Removed unused searchTerm state

  return (
    <Box bg="white">
      {/* NAVIGATION BAR */}
      <Container
        size="xl"
        py="md"
        style={{
          borderBottom: '1px solid #eee',
          backgroundColor: 'white',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <Flex justify="space-between" align="center" wrap="wrap" style={{ gap: theme.spacing.lg }}>
          <Flex align="center" gap="xl">
            <Image src="/images/main-logo.svg" alt="Fringe Logo" width={180} />
            <Group gap="lg">
            <Button
              component="a"
              href="#about"
              variant="subtle"
              color="pink"
              size="md"
              fw={700}
            >
              About Us
            </Button>

            <Button
              component="a"
              href="#contact"
              variant="subtle"
              color="pink"
              size="md"
              fw={700}
            >
              Contact Us
            </Button>
            </Group>
          </Flex>
          <Flex align="center" gap="sm">
            <Button
              component={Link}
              href="/planner"
              color="purple"
              variant="outline"
              radius="md"
              size="md"
              fw={700}
            >
              Planner
            </Button>

            <Button
              component={Link}
              href="/admin/login"
              leftSection={<IconUser size={18} />}
              color="purple"
              radius="md"
              size="md"
              fw={700}
            >
              Log In
            </Button>
          </Flex>
        </Flex>
      </Container>

      {/* background  */}
      <Box
        style={{
          backgroundImage: 'url("/images/admin/auth-layout.webp")',
          backgroundRepeat: 'repeat',
          backgroundSize: '200px',
          backgroundPosition: 'center',
          paddingTop: '8rem',
          paddingBottom: '8rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            backgroundColor: 'white',
            zIndex: 1,
          }}
        />
        <Container size="lg" style={{ zIndex: 2, position: 'relative' }}>
          <Flex justify="center" align="center" direction="column">
            <Title order={1} style={{ fontSize: 50, textAlign: 'center', color: theme.black, marginBottom: '1rem' }}>
              TELL US <br /> ABOUT YOUR
            </Title>
            <Title order={1} style={{ fontSize: 60, textAlign: 'center', color: theme.colors.pink[6], fontWeight: 900, lineHeight: 1.1 }}>
              FRINGE <br /> EXPERIENCE
            </Title>
          </Flex>
        </Container>
      </Box>

      {/* FILTER */}
      <Box
        style={{
          backgroundColor: '#ffe9f5',
          padding: '2rem 0',
          borderTop: '1px solid #eee',
          borderBottom: '1px solid #eee',
        }}
      >
        <Container size="xl">
          <Flex justify="center" align="center" wrap="wrap" style={{ gap: theme.spacing.md }}>
            <Box style={{ width: 350 }}>
              <TextInput
                radius="xl"
                size="md"
                placeholder="Search shows"
                rightSectionWidth={90}
                rightSection={
                  <Button color="purple" size="sm" radius="xl" fw={700}>
                    Search
                  </Button>
                }
              />
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* EXPLORE SHOWS*/}
      <Container size="xl" py="xl">
        <Flex justify="space-between" align="center" style={{ marginBottom: theme.spacing.md }}>
          <Title order={2} fw={700}>
            <Button color="purple" radius="md">Explore Shows</Button>
          </Title>
          <Button variant="outline" color="purple" radius="xl" size="xs">
            See all
          </Button>
        </Flex>

        <Flex style={{ gap: theme.spacing.lg }} wrap="wrap">
          {[
            {
              title: "The Kapil Sharma Show",
              subtitle: 'Comedy',
              img: '/images/home/kp.png',
              time: '29 Mar - 4 Apr',
              hour: '8:00pm',
            },
            {
              title: 'Mario The Magic Man',
              subtitle: 'Magic show',
              img: '/images/home/Magic.jpg',
              time: '27 Feb - 20 Apr',
              hour: '10:00am, 11:00am, 5:00pm',
            },
            {
              title: 'Big Circus Show',
              subtitle: 'Circus',
              img: '/images/home/circus.jpg',
              time: '28 Feb - 12 Apr',
              hour: '9:30am, 10:00am, 6:00pm',
            },
            {
              title: 'Jhon Legend',
              subtitle: 'Singer',
              img: '/images/home/Singer.jpg',
              desc: 'Aims to celebrate the rich diversity of artistic expression...',
              time: '13 Feb - 11 Apr',
              hour: '10:00am, 2:00pm',
            },
          ].map((item, i) => (
            <Box
              key={i}
              style={{
                width: 250,
                border: '1px solid #ddd',
                borderRadius: 10,
                overflow: 'hidden',
                backgroundColor: 'white',
              }}
            >
              <Image src={item.img} height={160} alt={item.title} />
              <Box p="sm">
                <Text size="xs" c='#f271a4' fw={600}>
                  {item.subtitle}
                </Text>
                <Text fw={700} mt={4}>
                  {item.title}
                </Text>
                <Text size="sm" mt={4} lineClamp={2}>
                  {item.desc}
                </Text>
                <Text size="xs" mt={6} c="black">
                  {item.time}
                  <br />
                  {item.hour}
                </Text>
              </Box>
            </Box>
          ))}
        </Flex>
      </Container>

      {/* sign up*/}
      <NewsletterSection />

      {/* about */}
      <AboutSection />

      {/* contact*/}
      <ContactSection />

      {/* footer */}
      <Box bg="black" py="xs" color="white">
        <Container size="xl">
          <Text ta="center" c="white" fz="sm" mb="lg">
            Adelaide Fringe recognises Kaurna Miyurna Yarta and all First Nations people...
          </Text>
          <Flex justify="space-between" wrap="wrap" gap="sm">
            <Box>
              <Text fw={700} mb="sm" c="white">Quick Links</Text>
              <Box style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Image src="/images/home/fb logo.webp" width={24} height={24} alt="Facebook" />
                <Image src="/images/home/insta.png" width={24} height={24} alt="Instagram" />
                <Image src="/images/home/tiktok.jpg" width={24} height={24} alt="TikTok" />
              </Box>
            </Box>
          </Flex>
          <Text size="xs" mt="lg" c="white" ta="center">
            © Adelaide Fringe 2025
          </Text>
        </Container>
      </Box>
    </Box>
  );
}