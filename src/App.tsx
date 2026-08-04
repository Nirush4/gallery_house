import type { JSX } from "react/jsx-runtime";
import { Box } from "@mantine/core";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar/Navbar";
import { ArtworkProvider } from "./context/ArtworkContext";

function App(): JSX.Element {
  return (
    <ArtworkProvider>
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
    </ArtworkProvider>
  );
}

export default App;
