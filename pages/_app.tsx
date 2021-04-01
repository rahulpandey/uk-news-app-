import React, { useMemo, useState } from "react";
import "fontsource-roboto";
import "../styles/globals.css";
import { ThemeProvider } from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";
import { darkTheme, lightheme } from "../app/theme";
import { Theme, ThemeState, ThemeContext } from "../app/context";

function MyApp({ Component, pageProps }) {
  const [apptheme, setAppTheme] = useState<Theme>("dark");
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const value: ThemeState = useMemo(
    () => ({
      theme: apptheme,
      setTheme: () => setAppTheme(apptheme === "dark" ? "light" : "dark"),
    }),
    [apptheme]
  );
  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={apptheme === "dark" ? darkTheme : lightheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default MyApp;
