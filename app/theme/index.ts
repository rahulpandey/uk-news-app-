import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});
const lightheme = createMuiTheme({
  palette: {
    type: "light",
  },
});

export {darkTheme,lightheme}
