'use client';

import React, { useEffect, useState } from 'react';
import {
  Anchor,
  Box,
  Button,
  Container,
  Flex,
  Image,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, AuthProvider } from '@/contexts/auth-context';

export default function CustomerLoginPageWrapper() {
  return (
    <AuthProvider>
      <CustomerLoginPage />
    </AuthProvider>
  );
}

function CustomerLoginPage() {
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const { login, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/planner');
    }
  }, [user, isLoading, router]);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: isEmail('Invalid email'),
      password: (value) =>
        value.length < 6 ? 'Password must be at least 6 characters' : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    setGeneralError(null);

    try {
      await login(values.email, values.password);
    } catch (error: unknown) {  // Changed from 'any' to 'unknown'
      const err = error as { message?: string; code?: string };  // Type assertion
      
      if (
        err?.message?.includes('auth') ||
        err?.code === 'auth/invalid-credential'
      ) {
        form.setErrors({ email: 'Invalid email or password' });
      } else {
        setGeneralError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex h="100vh" w="100%" style={{ overflow: 'hidden' }}>
      {/* Left Section - Login Form */}
      <Box
        w={{ base: '100%', md: '65%' }}
        h="100%"
        py="xl"
        px="md"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Container size="xs" w="100%">
          <Paper withBorder p="xl" shadow="xl" radius="sm">
            <Title order={2} ta="center" mb="md" c="pink">
              Log In
            </Title>

            <form onSubmit={form.onSubmit(handleSubmit)}>
              {generalError && (
                <Text c="red" size="sm" mb="md" ta="center">
                  {generalError}
                </Text>
              )}

              <TextInput
                label="Email"
                placeholder="Enter your email"
                type="email"
                autoComplete="email"
                {...form.getInputProps('email')}
                mb="md"
                required
              />

              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                autoComplete="current-password"
                {...form.getInputProps('password')}
                mb="lg"
                required
              />

              <Button
                type="submit"
                fullWidth
                color="purple.7"
                loading={loading}
                mb="md"
              >
                Log In
              </Button>
            </form>

            <Text size="sm" mt="sm" ta="center">
              <Link href="/auth/register" passHref legacyBehavior>
                <Anchor component="a">Don&apos;t have an account yet?</Anchor>
              </Link>
            </Text>

            <Text size="sm" ta="center">
              <Link href="/auth/forgot-password" passHref legacyBehavior>
                <Anchor component="a">Forgotten your password?</Anchor>
              </Link>
            </Text>
          </Paper>
        </Container>
      </Box>

      {/* Right Section - Image */}
      <Box
        w="35%"
        h="100%"
        bg="#f4f4f4"
        display={{ base: 'none', md: 'block' }}
        style={{ overflow: 'hidden' }}
      >
        <Image
          src="/images/admin/auth-layout.webp"
          alt="Fringe visual"
          style={{ width: '100%', height: '100%', objectFit: 'fill' }}
        />
      </Box>
    </Flex>
  );
}
