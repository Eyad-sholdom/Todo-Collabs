import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import Layout from "./layout/Layout";
import { UserProvider } from "./contexts/userContext";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from "./theme/theme";
import { useState } from "react";

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Use state to track the theme

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme); // Toggle the theme
    console.log(isDarkTheme);
  };
  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <BrowserRouter>
        <UserProvider>
          <Router />
        </UserProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
