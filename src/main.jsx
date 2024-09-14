import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material";
import theme from "./config/theme.js";
import App from "./App.jsx";
import { TestProvider } from "./config/TestProvider.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <TestProvider>
      <App />
    </TestProvider>
  </ThemeProvider>
);
