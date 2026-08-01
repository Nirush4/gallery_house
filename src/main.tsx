import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider, createTheme } from "@mantine/core";

import "@mantine/core/styles.css";
import "./index.css";

import App from "./App";

const theme = createTheme({
  primaryColor: "gallery",

  colors: {
    gallery: [
      "#F8F7F4",
      "#F1EFEA",
      "#E5E7EB",
      "#D1D5DB",
      "#9CA3AF",
      "#6B7280",
      "#4B5563",
      "#374151",
      "#222222",
      "#111111",
    ],
  },

  fontFamily:
    "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",

  headings: {
    fontFamily: "Georgia, serif",
    fontWeight: "500",
  },

  components: {
    NavLink: {
      styles: {
        root: {
          color: "#222222",
        },
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>,
);
