import type { JSX } from "react/jsx-runtime";
import { Anchor, Group, Stack } from "@mantine/core";
import { NavLink, useLocation } from "react-router-dom";

const links = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Gallery",
    to: "/gallery",
  },
  {
    label: "Login",
    to: "/login",
  },
];

interface Props {
  mobile?: boolean;
  onNavigate?: () => void;
}

export function NavLinks({ mobile, onNavigate }: Props): JSX.Element {
  const location = useLocation();

  const items = links.map((link) => {
    const active = location.pathname === link.to;

    return (
      <Anchor
        key={link.to}
        component={NavLink}
        to={link.to}
        onClick={onNavigate}
        underline="never"
        style={{
          color: active ? "#222222" : "#6B7280",

          fontFamily: "Georgia, serif",

          fontSize: "14px",

          letterSpacing: "0.18em",

          textTransform: "uppercase",

          borderBottom: active ? "2px solid #C6A15B" : "2px solid transparent",

          paddingBottom: 6,

          transition: "all .25s ease",
        }}
      >
        {link.label}
      </Anchor>
    );
  });

  return mobile ? (
    <Stack gap="xl">{items}</Stack>
  ) : (
    <Group gap={40}>{items}</Group>
  );
}
