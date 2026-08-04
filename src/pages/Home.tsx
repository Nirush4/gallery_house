import type { JSX } from "react";
import { Box, Container, Title, Text } from "@mantine/core";
import { GalleryHero } from "../components/Hero";
import { NewestArtworks } from "../components/NewestArtworks";

export const Home = (): JSX.Element => {
  return (
    <Box component="main" bg="#0c0a09" mih="100vh">
      <GalleryHero />

      <NewestArtworks />

      <Container size="xl" py={{ base: "3rem", md: "5rem" }}>
        <Title
          c="white"
          order={2}
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 300,
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
          }}
        >
          Current Exhibitions
        </Title>
        <Text c="gray.4" mt="md" maw="600px" style={{ lineHeight: 1.6 }}>
          Explore our curated seasonal gallery collections featuring classical
          and modern masterworks.
        </Text>
      </Container>
    </Box>
  );
};
