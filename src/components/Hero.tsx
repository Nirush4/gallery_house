import { useRef } from "react";
import type { JSX } from "react/jsx-runtime";
import {
  Box,
  Container,
  Group,
  Text,
  Title,
  Paper,
  Badge,
  Stack,
  Button,
  Drawer,
  ScrollArea,
  Divider,
  Grid,
} from "@mantine/core";
import { IconBook, IconExternalLink, IconSparkles } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";

export interface GalleryHeroProps {
  imageUrl?: string;
  title?: string;
  subtitle?: string;
  artist?: string;
  year?: string;
  medium?: string;
  location?: string;
  archiveCode?: string;
  articleSummary?: string;
  fullArticleText?: string[];
  onArtworkClick?: () => void;
}

export const GalleryHero = ({
  imageUrl = "https://www.arthistoryproject.com/site/assets/files/13917/peter-paul-rubens-obelisk-art-history.webp",
  title = "Where Antiquity Meets the Infinite Digital Form",
  subtitle = "Permanent Collection",
  artist = "Peter Paul Rubens",
  year = "1617",
  medium = "Oil on Canvas",
  location = "Flemish Masterworks • Room III",
  archiveCode = "NAA-2026-89",
  articleSummary = "An extraordinary Baroque composition capturing the monumental scale and dynamic tension typical of Peter Paul Rubens' early 17th-century masterworks.",
  fullArticleText = [
    "Painted during Rubens' prolific period following his return from Italy, this masterwork exemplifies his mastery of dramatic light, diagonal movement, and rich physical texture.",
    "The obelisk serves as a symbolic anchor—bridging ancient Mediterranean mythology with northern European humanist philosophy. Rubens employs bold brushwork and luminous glazes to accentuate the architectural weight against dynamic figures.",
    "Restored meticulously in late 2025, the canvas reveals underlying charcoal sketches and pentimenti that illuminate Rubens' spontaneous composition process.",
  ],
  onArtworkClick,
}: GalleryHeroProps): JSX.Element => {
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 22,
    restDelta: 0.0001,
  });

  const imageScale = useTransform(
    smoothScroll,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [1, 1.25],
  );

  const imageOpacity = useTransform(
    smoothScroll,
    [0, 0.85],
    shouldReduceMotion ? [1, 1] : [1, 0.7],
  );

  const textY = useTransform(
    smoothScroll,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -60],
  );

  const headerY = useTransform(
    smoothScroll,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -25],
  );

  return (
    <>
      <Box
        component="section"
        aria-label="Hero Section"
        ref={containerRef}
        pos="relative"
        mih={{ base: "100dvh", md: "100vh" }}
        w="100%"
        style={{
          overflow: "hidden",
          backgroundColor: "#0c0a09",
          color: "#f5f5f4",
        }}
      >
        <motion.div
          initial={shouldReduceMotion ? false : { scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 2.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            position: "absolute",
            inset: 0,
            scale: imageScale,
            opacity: imageOpacity,
            zIndex: 1,
            willChange: "transform",
          }}
        >
          <Box
            component="img"
            src={imageUrl}
            alt={`Artwork: ${title} by ${artist}`}
            w="100%"
            h="100%"
            referrerPolicy="no-referrer"
            style={{ objectFit: "cover" }}
          />

          <Box
            pos="absolute"
            inset={0}
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(circle at center, transparent 45%, rgba(12, 10, 9, 0.35) 100%), linear-gradient(to top, rgba(12, 10, 9, 0.65) 0%, transparent 60%)",
            }}
          />
        </motion.div>

        <Box
          aria-hidden="true"
          pos="absolute"
          inset={{ base: "12px", sm: "24px" }}
          style={{
            border: "1px solid rgba(255, 255, 255, 0.60)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        <Container
          size="xl"
          h="100%"
          mih={{ base: "100dvh", md: "100vh" }}
          pos="relative"
          px={{ base: "lg", sm: "xl", md: "2rem" }}
          py={{ base: "2rem", md: "3rem" }}
          style={{
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <motion.div
            initial={shouldReduceMotion ? false : { y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: headerY, width: "100%" }}
          >
            <Box
              pb="md"
              style={{
                borderBottom: "1px solid rgba(255, 255, 255, 0.40)",
              }}
            >
              <Group justify="space-between" align="center">
                <Group gap="xs">
                  <Box
                    w={6}
                    h={6}
                    style={{ backgroundColor: "#c83219", borderRadius: "50%" }}
                  />
                  <Text
                    size="xs"
                    fw={700}
                    c="white"
                    px="xs"
                    py={3}
                    style={{
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      backgroundColor: "rgba(12, 10, 9, 0.6)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      textShadow: "0 1px 4px rgba(0,0,0,0.8)",
                    }}
                  >
                    {archiveCode}
                  </Text>
                </Group>

                <Text
                  size="xs"
                  fw={600}
                  c="white"
                  visibleFrom="sm"
                  px="sm"
                  py={3}
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: "italic",
                    letterSpacing: "1px",
                    backgroundColor: "rgba(12, 10, 9, 0.6)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                  }}
                >
                  Nordic Art Archive Masterworks
                </Text>

                <Badge
                  variant="outline"
                  radius={0}
                  size="sm"
                  style={{
                    letterSpacing: "1.5px",
                    borderColor: "rgba(255, 255, 255, 0.4)",
                    color: "#ffffff",
                    backgroundColor: "rgba(12, 10, 9, 0.5)",
                  }}
                >
                  VOL. 2026
                </Badge>
              </Group>
            </Box>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { y: 45, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              y: textY,
              width: "100%",
              maxWidth: "880px",
              marginTop: "auto",
            }}
          >
            <Box
              p={{ base: "xl", sm: "2.5rem" }}
              style={{
                backgroundColor: "rgba(12, 10, 9, 0.68)",
                border: "1px solid rgba(255, 255, 255, 0.16)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6)",
              }}
            >
              <Stack gap="lg">
                <Group gap="xs" wrap="wrap">
                  <Badge
                    variant="filled"
                    radius={0}
                    size="md"
                    style={{
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      color: "black",
                      backgroundColor: "white",
                    }}
                  >
                    {subtitle}
                  </Badge>
                  <Text
                    size="xs"
                    c="gray.3"
                    tt="uppercase"
                    fw={500}
                    style={{ letterSpacing: "1px" }}
                  >
                    {location}
                  </Text>
                </Group>

                <Title
                  order={1}
                  c="white"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "clamp(2rem, 5vw, 4.2rem)",
                    fontWeight: 300,
                    fontStyle: "italic",
                    lineHeight: 1.08,
                    textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                  }}
                >
                  {title}
                </Title>

                <Paper
                  component="article"
                  aria-label="Artwork Metadata"
                  p="md"
                  radius={0}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    borderLeft: "3px solid #c83219",
                  }}
                >
                  <Group
                    justify="space-between"
                    align="center"
                    wrap="wrap"
                    gap="md"
                  >
                    <Box>
                      <Text
                        size="sm"
                        fw={600}
                        c="white"
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                        }}
                      >
                        {artist}
                      </Text>
                      <Text size="11px" c="gray.4" mt={2}>
                        {medium} • {year}
                      </Text>
                    </Box>

                    <Group gap="sm">
                      <Button
                        variant="filled"
                        color="red.8"
                        radius={0}
                        size="sm"
                        leftSection={<IconBook size={16} />}
                        onClick={openDrawer}
                        aria-label={`Read full article and details about ${title}`}
                        style={{
                          backgroundColor: "yellow",
                          color: "black",
                          fontSize: "12px",
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                          fontWeight: 600,
                          paddingLeft: "18px",
                          paddingRight: "18px",
                        }}
                      >
                        Read Article
                      </Button>

                      {/* SECONDARY OPTIONAL CTA BUTTON */}
                      {onArtworkClick && (
                        <Button
                          variant="outline"
                          color="gray.0"
                          radius={0}
                          size="sm"
                          rightSection={<IconExternalLink size={14} />}
                          onClick={onArtworkClick}
                          aria-label={`View piece technical details`}
                          style={{
                            borderColor: "rgba(255, 255, 255, 0.4)",
                            color: "#ffffff",
                            fontSize: "12px",
                            letterSpacing: "0.5px",
                            fontWeight: 500,
                          }}
                        >
                          Piece Info
                        </Button>
                      )}
                    </Group>
                  </Group>
                </Paper>
              </Stack>
            </Box>
          </motion.div>
        </Container>
      </Box>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        position="right"
        size="lg"
        title={
          <Group gap="xs">
            <IconSparkles size={18} color="#c83219" />
            <Text
              size="xs"
              fw={700}
              tt="uppercase"
              style={{ letterSpacing: "1.5px" }}
            >
              Archive Entry • {archiveCode}
            </Text>
          </Group>
        }
        styles={{
          header: {
            backgroundColor: "#0c0a09",
            color: "#ffffff",
            borderBottom: "1px solid rgba(255,255,255,0.15)",
            padding: "20px 24px",
          },
          body: {
            backgroundColor: "#0c0a09",
            color: "#e7e5e4",
            padding: 0,
          },
          close: {
            color: "#ffffff",
          },
        }}
      >
        <ScrollArea h="calc(100vh - 70px)" px="xl" py="lg">
          <Stack gap="xl">
            <Box>
              <Text size="xs" c="gray.5" tt="uppercase" fw={600} mb={4}>
                {artist} ({year})
              </Text>
              <Title
                order={2}
                c="white"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "1.8rem",
                  lineHeight: 1.2,
                }}
              >
                {title}
              </Title>
            </Box>

            <Box
              component="img"
              src={imageUrl}
              alt={title}
              w="100%"
              h={260}
              style={{
                objectFit: "cover",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            />

            <Paper
              p="md"
              radius={0}
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <Grid id="artwork-specifications">
                <Grid.Col span={6}>
                  <Text size="11px" c="gray.5" tt="uppercase">
                    Medium
                  </Text>
                  <Text size="xs" fw={600} c="white">
                    {medium}
                  </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="11px" c="gray.5" tt="uppercase">
                    Location
                  </Text>
                  <Text size="xs" fw={600} c="white">
                    {location}
                  </Text>
                </Grid.Col>
              </Grid>
            </Paper>

            <Divider color="rgba(255,255,255,0.15)" />

            <Box>
              <Text
                size="sm"
                fw={500}
                c="gray.2"
                style={{
                  fontStyle: "italic",
                  lineHeight: 1.6,
                  borderLeft: "2px solid #c83219",
                  paddingLeft: "14px",
                }}
              >
                {articleSummary}
              </Text>

              <Stack gap="md" mt="xl">
                {fullArticleText.map((paragraph, idx) => (
                  <Text
                    key={idx}
                    size="sm"
                    c="gray.3"
                    style={{ lineHeight: 1.7 }}
                  >
                    {paragraph}
                  </Text>
                ))}
              </Stack>
            </Box>
          </Stack>
        </ScrollArea>
      </Drawer>
    </>
  );
};
