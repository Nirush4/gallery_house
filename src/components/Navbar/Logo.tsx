import type { JSX } from "react/jsx-runtime";
import { Image } from "@mantine/core";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";

export function Logo(): JSX.Element {
  return (
    <Link
      to="/"
      aria-label="Gallery House home"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Image src={logo} alt="Gallery House" h={55} w="auto" fit="contain" />
    </Link>
  );
}
