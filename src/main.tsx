import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider
      theme={{
        colors: {
          bgSecondary: "#FFFFFF",
          bgPrimary: "#F8F9FD",
          textPrimary: "#0D1455",
          textSecondary: "#7D8CA8",
          secondary: "#DCE2F4",
          primary: "#3547AC",
          danger: "#DE0B15",
          success: "#1CB955",
          info: "#349FC5",
        },
      }}
    >
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
