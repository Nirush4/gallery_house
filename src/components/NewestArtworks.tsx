import React, { forwardRef } from "react";
import {
  Container,
  Title,
  Text,
  Grid,
  Box,
  Group,
  Stack,
  Skeleton,
  Alert,
  UnstyledButton,
  Button,
  Center,
} from "@mantine/core";
import type { BoxProps } from "@mantine/core";
import { IconAlertCircle, IconArrowRight } from "@tabler/icons-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useArtworks } from "../context/ArtworkContext";
import { ArtworkCard } from "./ArtworkCard";
import type { Artwork } from "../types/artwork";

const MotionBoxWrapper = forwardRef<HTMLDivElement, BoxProps>((props, ref) => (
  <Box ref={ref} {...props} />
));
MotionBoxWrapper.displayName = "MotionBoxWrapper";

const MotionBox = motion.create(MotionBoxWrapper);

const COLUMN_OFFSETS = [
  { base: "0px", md: "0px" },
  { base: "0px", md: "70px" },
  { base: "0px", md: "140px" },
  { base: "0px", md: "0px" },
  { base: "0px", md: "70px" },
  { base: "0px", md: "140px" },
];

export const NewestArtworks: React.FC = () => {
  const { artworks, newestArtworks, isLoading, error } = useArtworks();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const sourceList =
    artworks && artworks.length > 0 ? artworks : newestArtworks || [];

  const displayedArtworks = sourceList.slice(5, 14);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <Box
      component="section"
      aria-labelledby="newest-artworks-heading"
      py={{ base: "4rem", md: "6rem" }}
      style={{ backgroundColor: "#ffffff", color: "#111111" }}
    >
      <Container size="xl" px={{ base: "md", md: "xl" }}>
        <Group
          justify="space-between"
          align="flex-end"
          mb={{ base: "3rem", md: "5rem" }}
        >
          <Stack gap={4}>
            <Text
              size="10px"
              fw={700}
              c="#c83219"
              tt="uppercase"
              style={{ letterSpacing: "2px" }}
            >
              01 — THE FEED
            </Text>
            <Title
              id="newest-artworks-heading"
              order={2}
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                fontWeight: 400,
                letterSpacing: "-0.5px",
                color: "#111111",
              }}
            >
              Newest artworks
            </Title>
          </Stack>

          <UnstyledButton
            onClick={() => navigate("/collection")}
            aria-label="See all artworks"
            style={{ fontSize: "13px", fontWeight: 500, color: "#111111" }}
          >
            see all →
          </UnstyledButton>
        </Group>

        {error && (
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Unable to load feed"
            color="red"
            radius={0}
            mb="xl"
          >
            {error}
          </Alert>
        )}

        {isLoading && (
          <Grid>
            {[0, 1, 2, 3, 4, 5].map((idx) => (
              <Grid.Col key={idx} span={{ base: 12, sm: 6, md: 4 }}>
                <Box pt={COLUMN_OFFSETS[idx]}>
                  <Skeleton height={380} radius={0} />
                </Box>
              </Grid.Col>
            ))}
          </Grid>
        )}

        {!isLoading && !error && (
          <>
            <MotionBox
              variants={containerVariants}
              initial={shouldReduceMotion ? "show" : "hidden"}
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              <Grid>
                {displayedArtworks.map((artwork: Artwork, index: number) => {
                  const paddingOffset =
                    COLUMN_OFFSETS[index % COLUMN_OFFSETS.length];

                  return (
                    <Grid.Col
                      key={artwork.id || index}
                      span={{ base: 12, sm: 6, md: 4 }}
                    >
                      <MotionBox
                        variants={itemVariants}
                        pt={paddingOffset}
                        mb={{ base: "3rem", md: "5rem" }}
                      >
                        <ArtworkCard artwork={artwork} />
                      </MotionBox>
                    </Grid.Col>
                  );
                })}
              </Grid>
            </MotionBox>

            <Center mt={{ base: "2rem", md: "4rem" }}>
              <Button
                variant="outline"
                color="dark"
                radius={0}
                size="md"
                rightSection={<IconArrowRight size={16} />}
                onClick={() => navigate("/collection")}
                style={{
                  fontFamily: "Georgia, serif",
                  fontWeight: 400,
                  letterSpacing: "0.5px",
                  borderColor: "#111111",
                  padding: "0 2.5rem",
                }}
              >
                Explore Full Collection
              </Button>
            </Center>
          </>
        )}
      </Container>
    </Box>
  );
};
