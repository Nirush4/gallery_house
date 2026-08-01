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

export function Navbar() {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <>
      <Box bg="red.8" c="#F8F7F4" py={10}>
        <Container size="xl">
          <Flex justify="space-between" align="center">
            <Box
              component="span"
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
                color: "#F8F7F4",
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
        bg="#F8F7F4"
        style={{
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        <Container size="xl">
          <Flex
            h={100}
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
              style={{
                transform: "translateX(-50%)",
              }}
            >
              <Logo />
            </Box>

            <Group ml="auto">
              <ActionIcon
                visibleFrom="md"
                variant="subtle"
                color="#222222"
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
          <Box pr={20}>
            <Logo />
          </Box>
        }
        styles={{
          content: {
            backgroundColor: "#F8F7F4",
          },
          header: {
            backgroundColor: "#F8F7F4",
            padding: "24px 24px ",
            borderBottom: "1px solid #E5E7EB",
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
            color: "#222222",
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
