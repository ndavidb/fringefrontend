// admin/portal/page.tsx
'use client';

import {Title, Box, Group, Center} from '@mantine/core';

export default function OverviewPage() {
    return (
        <Box className="flex flex-col gap-4 p-4">
            <Group>
                <Title order={1} className="text-3xl font-bold">
                    Admin Panel Dashboard
                </Title>
            </Group>
            <Center mih="40vh">
                <Title order={2} className="text-2xl font-bold">
                    Sprint 2
                </Title>
            </Center>
        </Box>
    );
}