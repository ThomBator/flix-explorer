import { colorsTuple, createTheme, virtualColor } from "@mantine/core";
import { type MantineColorsTuple } from "@mantine/core";

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

export const theme = createTheme({
  primaryColor: "brand",
  colors: {
    mainTextLight: colorsTuple("#000"),
    mainTextDark: colorsTuple("#FFF"),
    mainText: virtualColor({
      name: "mainText",
      dark: "mainTextDark",
      light: "mainTextLight",
    }),
    altText: colorsTuple("#FFF"),

    dimTextLight: colorsTuple("#343a40"),
    dimTextDark: colorsTuple("#edeef0ff"),
    dimText: virtualColor({
      name: "dimText",
      dark: "dimTextDark",
      light: "dimTextLight",
    }),
    lightBrand,
    darkBrand,

    accentBg: colorsTuple("#475561"),

    brand: virtualColor({
      name: "brand",
      dark: "darkBrand",
      light: "lightBrand",
    }),
  },
});
