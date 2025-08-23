import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Fade,
} from "@mui/material";

function ChatComponent() {
  const [prompt, setPrompt] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [showResponse, setShowResponse] = useState(false);

  const askAI = async () => {
    if (!prompt.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:8080/ask-ai?prompt=${prompt}`
      );
      const data = await response.text();
      setChatResponse(data);
      setShowResponse(true); // trigger fade animation
    } catch (error) {
      console.error("Error generating text: ", error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "70vh", gap: 2 }}
    >
      <Typography
        sx={{ mt: 2, mb: 1, fontWeight: "bold" }}
        variant="h4"
        gutterBottom
        align="center"
      >
        Hey,🖐🏻!,<br /> Ask me anything 😉😎
      </Typography>

      <TextField
  fullWidth
  sx={{
    maxWidth: 500,
    "& .MuiOutlinedInput-root": {
      borderRadius: "50px",
    },
  }}
  label="Say, what you want from me?"
  variant="outlined"
  value={prompt}
  onChange={(e) => setPrompt(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      askAI(); // trigger button action
    }
  }}
/>

      <Button
        variant="contained"
        color="secondary"
        onClick={askAI}
        sx={{
          borderRadius: "50px",
          padding: "10px 30px",
          mt: 2,
          mb: 2,
        }}
      >
        Ask !
      </Button>

      <Fade in={showResponse} timeout={800}>
        <Paper
          sx={{
            mt: 3,
            p: 3,
            borderRadius: 3,
            maxWidth: 600,
            width: "100%",
            bgcolor: "background.paper",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
          elevation={6}
        >
          <Typography
            variant="body1"
            sx={{
              whiteSpace: "pre-wrap",
              fontStyle: "italic",
              color: "text.secondary",
            }}
          >
            💬 {chatResponse}
          </Typography>
        </Paper>
      </Fade>
    </Box>
  );
}

export default ChatComponent;
