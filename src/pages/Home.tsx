import { type JSX } from "react";
import { Box, Container, Title, Text } from "@mantine/core";
import { GalleryHero } from "../components/Hero";

export const Home = (): JSX.Element => {
  return (
    <Box component="main" bg="white" mih="100vh">
      <GalleryHero />

      <Container size="xl" py="100px">
        <Title c="black" order={2} style={{ fontFamily: "serif" }}>
          Current Exhibitions
        </Title>
        <Text c="dimmed" mt="md" maw="600px">
          Explore our curated seasonal gallery collections featuring classical
          and modern masterworks.
        </Text>
        <Box h="1000px" />
      </Container>
    </Box>
  );
};
