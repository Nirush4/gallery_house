import type { JSX } from "react/jsx-runtime";
import { Box } from "@mantine/core";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar/Navbar";

function App(): JSX.Element {
  return (
    <>
      <Navbar />
      <Box
        component="main"
        mih="100vh"
        bg="gallery.0"
        c="gallery.9"
        style={{
          fontFamily: "var(--mantine-font-family)",
          "::selection": {
            backgroundColor: "var(--mantine-color-amber-5)",
            color: "var(--mantine-color-gallery-9)",
          },
        }}
      >
        <Home />
      </Box>
    </>
  );
}

export default App;
