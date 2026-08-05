import type { JSX } from "react/jsx-runtime";
import {
  ActionIcon,
  Box,
  Burger,
  Container,
  Drawer,
  Group,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { NavLink } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";

export function Navbar(): JSX.Element {
  const [opened, { toggle, close }] = useDisclosure(false);

  // Track scroll position
  const { scrollY } = useScroll();

  // Smooth scroll transitions using Framer Motion spring physics
  const smoothY = useSpring(scrollY, {
    stiffness: 200,
    damping: 25,
    restDelta: 0.001,
  });

  // Map scroll distance [0px -> 150px] to fluid properties
  // Increased scaled logo height to 44px (scale 0.80) for better visibility
  const logoScale = useTransform(smoothY, [0, 150], [1, 0.8]);
  const logoHeight = useTransform(smoothY, [0, 150], [55, 44]);
  const headerHeight = useTransform(smoothY, [0, 150], ["90px", "68px"]);
  const bgOpacity = useTransform(smoothY, [0, 100], [0.88, 0.96]);
  const shadowOpacity = useTransform(smoothY, [0, 150], [0, 0.08]);

  return (
    <>
      <Box
        bg="red.9"
        c="accent.2"
        py={10}
        component="aside"
        aria-label="Announcement Bar"
      >
        <Container size="xl">
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              component="span"
              c="white"
              style={{
                fontSize: "12px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
              }}
            >
              Gallery House — Digital Art Archive
            </Box>

            <NavLink
              to="/login"
              style={({ isActive }) => ({
                color: "var(--mantine-color-gray-0)",
                fontSize: "12px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: isActive ? "underline" : "none",
                fontWeight: 600,
                outlineOffset: "2px",
              })}
            >
              Login
            </NavLink>
          </Box>
        </Container>
      </Box>

      <motion.header
        role="banner"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          borderBottom: "1px solid var(--mantine-color-gray-3)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          backgroundColor: useTransform(
            bgOpacity,
            (o) => `rgba(248, 247, 244, ${o})`,
          ),
          boxShadow: useTransform(
            shadowOpacity,
            (s) => `0 10px 30px -10px rgba(0, 0, 0, ${s})`,
          ),
        }}
      >
        <Container size="xl">
          <motion.nav
            aria-label="Main navigation"
            style={{
              height: headerHeight,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <Box visibleFrom="md">
              <NavLinks />
            </Box>

            <Box
              pos="absolute"
              left="50%"
              top="50%"
              style={{
                transform: "translate(-50%, -50%)",
                zIndex: 1,
              }}
            >
              <Logo scale={logoScale} logoHeight={logoHeight} />
            </Box>

            <Group ml="auto" gap="xs">
              <ActionIcon
                visibleFrom="md"
                variant="subtle"
                color="dark"
                size="lg"
                aria-label="Search artwork catalog"
                style={{
                  minWidth: "44px",
                  minHeight: "44px",
                }}
              >
                <IconSearch size={20} aria-hidden="true" />
              </ActionIcon>

              <Burger
                hiddenFrom="md"
                opened={opened}
                onClick={toggle}
                size="sm"
                aria-label={
                  opened
                    ? "Close main navigation menu"
                    : "Open main navigation menu"
                }
                aria-expanded={opened}
                aria-controls="mobile-navigation"
                style={{
                  minWidth: "44px",
                  minHeight: "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </Group>
          </motion.nav>
        </Container>
      </motion.header>

      <Drawer
        id="mobile-navigation"
        opened={opened}
        onClose={close}
        hiddenFrom="md"
        position="right"
        size="80%"
        aria-label="Mobile menu content"
        title={
          <Box pr="xl">
            <Logo />
          </Box>
        }
        styles={{
          content: {
            backgroundColor: "var(--mantine-color-gray-0)",
          },
          header: {
            backgroundColor: "var(--mantine-color-gray-0)",
            padding: "15px 24px",
            borderBottom: "1px solid var(--mantine-color-gray-3)",
            alignItems: "center",
          },
          title: {
            display: "flex",
            alignItems: "center",
          },
          body: {
            paddingTop: 35,
          },
          close: {
            width: 44,
            height: 44,
            color: "var(--mantine-color-dark-9)",
          },
        }}
      >
        <nav aria-label="Mobile site links">
          <NavLinks mobile onNavigate={close} />
        </nav>
      </Drawer>
    </>
  );
}
