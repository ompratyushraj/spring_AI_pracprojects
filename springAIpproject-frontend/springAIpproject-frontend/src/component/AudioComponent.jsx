import axios from "axios";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Alert
} from "@mui/material";

function AudioComponent() {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setErrorMessage(""); // reset error when choosing new file
    setTranscription("");
  };

  const handleUpload = async () => {
    if (!file) {
      setErrorMessage("Please select an audio file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8080/transcribe-audio",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setTranscription(response.data);
      setErrorMessage("");
    } catch (error) {
      console.error("Error transcribing audio:", error);

      if (error.response && error.response.data) {
        setErrorMessage(
          error.response.data.message ||
            "Something went wrong on the server. Or the OpenAI API is not working, kindly check transaction details or buy tokens."
        );
      } else {
        setErrorMessage("Network error. Please try again.");
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        mt: 5,
        px: 2,
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
        Audio to Text Transcriber
      </Typography>

      {/* File Input - styled */}
      <Button
        variant="outlined"
        component="label"
        color="primary"
        sx={{
          borderRadius: "50px",
          padding: "10px 30px",
          mb: 2, mt: 1,
          textTransform: "none",
        }}
      >
        {file ? file.name : "Choose Audio File"}
        <input type="file" hidden accept="audio/*" onChange={handleFileChange} />
      </Button>

      {/* Upload Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        sx={{
          borderRadius: "50px",
          padding: "10px 30px",
          mt: 1,
          mb: 3,
          textTransform: "none",
        }}
      >
        Upload and Transcribe
      </Button>

      {/* Error Message */}
      {errorMessage && (
        <Box sx={{ width: "100%", maxWidth: 600, mb: 2 }}>
          <Alert
            severity="error"
            variant="filled"
            sx={{
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            {errorMessage}
          </Alert>
        </Box>
      )}


      {/* Transcription Result */}
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          bgcolor: "grey.900",
          color: "white",
          maxWidth: 600,
          width: "100%",
          textAlign: "center",
        }}
        elevation={4}
      >
        <Typography variant="h6" gutterBottom>
          Transcription Result
        </Typography>
        {errorMessage ? (
          <Typography color="error">⚠️ Something went wrong.</Typography>
        ) : (
          <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
            {transcription}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}

export default AudioComponent;
