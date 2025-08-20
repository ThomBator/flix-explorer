import { createTheme } from "@mantine/core";
import type { MantineColorsTuple, CSSVariablesResolver } from "@mantine/core";

// --- Your palettes as-is ---
export const lightBrand: MantineColorsTuple = [
  "#f2f5f8",
  "#e5e7e9",
  "#c6cdd3",
  "#a4b2be",
  "#889bac",
  "#768da2",
  "#6b859e",
  "#5a738a",
  "#4e667c",
  "#273745",
];

export const darkBrand: MantineColorsTuple = [
  "#ffebed",
  "#fbd6d9",
  "#efacb1",
  "#e47f86",
  "#db5962",
  "#d6414b",
  "#d4313c",
  "#bd2631",
  "#a91e2a",
  "#951322",
];

// Helper to map a brand tuple to Mantine CSS vars
const toBrandVars = (tuple: MantineColorsTuple) =>
  Object.fromEntries(
    tuple.map((v, i) => [`--mantine-color-brand-${i}`, v])
  ) as Record<string, string>;

export const theme = createTheme({
  primaryColor: "brand",
  colors: { brand: lightBrand },
  // expose your text tokens as CSS vars so they can swap by scheme
  other: {
    mainText: "var(--main-text)",
    alternateText: "var(--alt-text)",
    dimText: "var(--dim-text)",
  },
});

export const cssVariablesResolver: CSSVariablesResolver = () => ({
  variables: {
    ...toBrandVars(lightBrand),
    "--main-text": "#000",
    "--alt-text": "#fff",
    "--dim-text": "#343a40",
  },
  light: {
    ...toBrandVars(lightBrand),
    "--header-bg": "#fff",
    "--main-text": "#000",
    "--alt-text": "#fff",
    "--dim-text": "#343a40",
  },
  dark: {
    ...toBrandVars(darkBrand),
    "--header-bg": "#273745d9",
    "--main-text": "#fff",
    "--alt-text": "#000",
    "--dim-text": "#edeef0ff",
  },
});
