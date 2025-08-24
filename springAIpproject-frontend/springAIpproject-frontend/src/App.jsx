import React, { useState } from "react";
import {
  AppBar,
  Tabs,
  Tab,
  Container,
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Paper,
} from "@mui/material";
import ImageGenerator from "./component/ImageGenerator";
import ChatComponent from "./component/ChatComponent";
import RecipeGenerator from "./component/RecipeGenerator";
import AudioComponent from "./component/AudioComponent";

function App() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Enable Dark Mode Theme
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#90caf9",
      },
      secondary: {
        main: "#f48fb1",
      },
      background: {
        default: "#121212",
        paper: "#1e1e1e",
      },
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      {/* Navigation Bar */}
      <AppBar position="static" color="primary">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          textColor="inherit"
          indicatorColor="primary"
          centered
        >
          <Tab label="Chat Generator" />
          <Tab label="Recipe Generator" />
          <Tab label="Audio Transcriber" />
          <Tab label="Image Generator" />
        </Tabs>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
          <Box>
            {activeTab === 1 && <RecipeGenerator />}
            {activeTab === 3 && <ImageGenerator />}
            {activeTab === 0 && <ChatComponent />}
            {activeTab === 2 && <AudioComponent />}
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
