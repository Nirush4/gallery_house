import type { JSX } from "react/jsx-runtime";
import { Image, Box } from "@mantine/core";
import { Link } from "react-router-dom";
import { motion, MotionValue, useReducedMotion } from "framer-motion";

import logo from "../../assets/logo.png";

interface LogoProps {
  scale?: MotionValue<number>;
  logoHeight?: MotionValue<number>;
}

export function Logo({ scale, logoHeight }: LogoProps): JSX.Element {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Box
      component={Link}
      to="/"
      aria-label="Gallery House Home - Return to top"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "4px",
        outlineOffset: "4px",
      }}
    >
      <motion.div
        style={{
          scale: shouldReduceMotion ? 1 : scale ?? 1,
          willChange: "transform",
        }}
      >
        {logoHeight && !shouldReduceMotion ? (
          <motion.div style={{ height: logoHeight }}>
            <Image
              src={logo}
              alt="Gallery House"
              h="100%"
              w="auto"
              fit="contain"
            />
          </motion.div>
        ) : (
          <Image src={logo} alt="Gallery House" h={55} w="auto" fit="contain" />
        )}
      </motion.div>
    </Box>
  );
}
