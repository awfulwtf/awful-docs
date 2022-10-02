import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "nextra-theme-docs/style.css";

const theme = extendTheme({
  colors: {
    brand: {
      900: "#FF8C00"
    }
  }
});

export default function Nextra({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
