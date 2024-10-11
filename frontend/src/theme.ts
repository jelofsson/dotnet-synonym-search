import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1228,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: "#FBDA0C",
      light: "#FBDA0C",
      dark: "#FBDA0C",
      contrastText: "#000",
    },
    secondary: {
      main: "#0056AD",
      light: "#0056AD",
      dark: "#0056AD",
      contrastText: "#fff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          width: "100%",
          textTransform: "none",
          padding: "15px 20px",
        },
      },
    },
  },
});

export default theme;
