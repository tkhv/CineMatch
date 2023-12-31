import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import Navbar from "./pages/components/Navbar";
import Footer from "./pages/components/Footer";
import AuthPage from "./pages/AuthPage";
import RatePage from "./pages/RatePage";
import BrowsePage from "./pages/BrowsePage";
import PartyPage from "./pages/PartyPage";
import RandomPage from "./pages/RandomPage";

import { UserContext } from "./UserContext";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
      light: "rgba(255, 255, 255, 0.7)",
      dark: "rgba(255,255,255,0.5)",
    },
    secondary: {
      main: "#b0bec5",
    },
    background: {
      default: "#121212",
      paper: "#121212",
    },
  },
  shape: {
    borderRadius: 5,
  },
  components: {
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 46,
          height: 27,
          padding: 0,
          margin: 8,
        },
        switchBase: {
          padding: 1,
          "&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + $track": {
              opacity: 1,
              border: "none",
            },
          },
        },
        thumb: {
          width: 24,
          height: 24,
        },
        track: {
          borderRadius: 13,
          border: "1px solid #bdbdbd",
          backgroundColor: "#fafafa",
          opacity: 1,
          transition:
            "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

// NOTE: the custom Navbar is the top banner hosting the 'Rate', 'Browse', 'Party', and 'Logout' buttons.
function App() {
  const [username, setUsername] = useState<string | null>(null);
  // Load the username from local storage when the component mounts
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Save the username to local storage whenever it changes
  useEffect(() => {
    if (username) {
      localStorage.setItem("username", username);
    } else {
      localStorage.removeItem("username");
    }
  }, [username]);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/rate" element={<RatePage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/party" element={<PartyPage />} />
            <Route path="/random" element={<RandomPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
