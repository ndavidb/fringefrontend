"use client";

import {
    IconAdjustments,
    IconMapPin,
    IconCalendarStats,
    IconCoins,
    IconFileAnalytics,
    IconGauge,
} from "@tabler/icons-react";
import {Center, Image, ScrollArea} from "@mantine/core";
import {LinksGroup} from "./NavbarLinksGroup/NavbarLinksGroup";
import classes from "./Navbar.module.css";
import React from "react";

const mockdata = [
    {label: "Dashboard", icon: IconGauge, link: "/admin/portal/"},

    {label: "Venue Management", icon: IconMapPin, link: "/admin/portal/venue-management"},
    {
        label: "Shows Management",
        icon: IconCoins,
        link: "/admin/portal/shows-management"
    },
    {
        label: "Events",
        icon: IconCalendarStats,
        links: [
            {label: "Overview", link: "/"},
            {label: "Create Performance", link: "/"},
        ],
    },
    {label: "Reporting", icon: IconFileAnalytics, link: "/admin/portal/"},
    {label: "Settings", icon: IconAdjustments, link: "/admin/portal/settings"},
];

export function Navbar() {
    const links = mockdata.map((item) => (
        <LinksGroup {...item} key={item.label}/>
    ));

    return (
        <nav className={classes.navbar}>
            <div className={classes.header}>
                <Center>
                    <Image src="/images/main-logo.svg" alt="Adelaide Fringe Logo" w={150}></Image>
                </Center>

            </div>


            <ScrollArea className={classes.links}>
                <div className={classes.linksInner}>{links}</div>
            </ScrollArea>

        </nav>
    );
}
