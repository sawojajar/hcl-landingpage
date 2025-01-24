import { theme as defaultTheme, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  ...defaultTheme,
  colors: {
    primary: {
      50: '#EAF2EE',
      100: '#CEE1D7',
      200: '#ADCDBC',
      300: '#83B49A',
      400: '#5A9B79',
      500: '#086936',
      600: '#07582D',
      700: '#054624',
      800: '#04351B',
      900: '#032312',
    }
  },
});

export { theme };
