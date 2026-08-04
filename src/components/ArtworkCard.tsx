import React, { forwardRef } from "react";
import { Box, Image, Text, UnstyledButton } from "@mantine/core";
import type { BoxProps } from "@mantine/core";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { Artwork } from "../types/artwork";

const MotionBoxWrapper = forwardRef<HTMLDivElement, BoxProps>((props, ref) => (
  <Box ref={ref} {...props} />
));
MotionBoxWrapper.displayName = "MotionBoxWrapper";

const MotionBox = motion.create(MotionBoxWrapper);

export const ArtworkCard: React.FC<{ artwork: Artwork }> = ({ artwork }) => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const titleText = artwork?.title || "Untitled";
  const yearText = artwork?.year ? `, ${artwork.year}` : "";
  const artistText = artwork?.artist || "Unknown Artist";
  const mediumText = artwork?.medium ? ` · ${artwork.medium}` : "";

  return (
    <Box style={{ width: "100%", textAlign: "left" }}>
      <UnstyledButton
        onClick={() => navigate(`/artwork/${artwork?.id}`)}
        aria-label={`View artwork ${titleText}`}
        style={{
          width: "100%",
          display: "block",
          cursor: "pointer",
        }}
      >
        <MotionBox
          whileHover={shouldReduceMotion ? {} : { y: -4 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            overflow: "hidden",
            backgroundColor: "#ffffff",
            border: "1px solid #e2e2e2",
            padding: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
          }}
        >
          <Box style={{ overflow: "hidden", backgroundColor: "#f9f9f9" }}>
            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Image
                src={artwork?.image?.url}
                alt={artwork?.image?.alt || titleText}
                w="100%"
                h="auto"
                fit="cover"
                style={{ display: "block" }}
              />
            </motion.div>
          </Box>
        </MotionBox>

        <Box mt="md">
          <Text
            component="p"
            m={0}
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontSize: "1.15rem",
              fontWeight: 400,
              color: "#222222",
              lineHeight: 1.3,
            }}
          >
            {titleText}
            {yearText}
          </Text>

          <Text
            size="sm"
            c="gray.7"
            mt={4}
            style={{
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
              fontSize: "0.9rem",
              lineHeight: 1.4,
            }}
          >
            {artistText}
            {mediumText}
          </Text>

          <Text
            mt="sm"
            style={{
              fontSize: "0.95rem",
              fontWeight: 500,
              color: "#c83219",
              display: "inline-block",
            }}
          >
            view artwork →
          </Text>
        </Box>
      </UnstyledButton>
    </Box>
  );
};
