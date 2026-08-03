import type { JSX } from "react/jsx-runtime";
import {
  ActionIcon,
  Box,
  Burger,
  Container,
  Drawer,
  Flex,
  Group,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { NavLink } from "react-router-dom";

import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";

export function Navbar(): JSX.Element {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <>
      <Box bg="red.9" c="accent.2" py={10}>
        <Container size="xl">
          <Flex justify="space-between" align="center">
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
              })}
            >
              Login
            </NavLink>
          </Flex>
        </Container>
      </Box>

      <Box
        bg="accent.2"
        style={{
          borderBottom: "1px solid var(--mantine-color-gray-3)",
        }}
      >
        <Container size="xl">
          <Flex
            h={{ base: 80, md: 100 }}
            align="center"
            justify="space-between"
            pos="relative"
            component="nav"
            aria-label="Main navigation"
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
              }}
            >
              <Logo />
            </Box>

            <Group ml="auto">
              <ActionIcon
                visibleFrom="md"
                variant="subtle"
                color="dark"
                aria-label="Search artwork"
              >
                <IconSearch size={20} />
              </ActionIcon>

              <Burger
                hiddenFrom="md"
                opened={opened}
                onClick={toggle}
                aria-label={
                  opened ? "Close navigation menu" : "Open navigation menu"
                }
                aria-expanded={opened}
                aria-controls="mobile-navigation"
              />
            </Group>
          </Flex>
        </Container>
      </Box>

      <Drawer
        id="mobile-navigation"
        opened={opened}
        onClose={close}
        hiddenFrom="md"
        position="right"
        size="80%"
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
        <nav aria-label="Mobile navigation">
          <NavLinks mobile onNavigate={close} />
        </nav>
      </Drawer>
    </>
  );
}
