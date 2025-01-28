import { textStyles } from "@/components/text";
import { theme as defaultTheme, extendTheme } from "@chakra-ui/react";

const customColor = {
  primary: {
    50: "#EAF2EE",
    100: "#CEE1D7",
    200: "#ADCDBC",
    300: "#83B49A",
    400: "#5A9B79",
    500: "#086936",
    600: "#07582D",
    700: "#054624",
    800: "#04351B",
    900: "#032312",
  },
};

const theme = extendTheme({
  colors: customColor,
  textStyles
});

export { theme };
