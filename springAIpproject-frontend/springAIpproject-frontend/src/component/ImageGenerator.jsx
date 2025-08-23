import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Grid,
  Card,
  CardMedia,
} from "@mui/material";

function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [imageUrls, setImageUrls] = useState([]);

  const generateImage = async () => {
    if (!prompt.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:8080/generate-image?prompt=${prompt}`
      );
      const urls = await response.json();
      setImageUrls(urls);
    } catch (error) {
      console.error("Error generating image: ", error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ mt: 2 }}
    >
      <Typography variant="h4" sx={{mb: 3, fontWeight: "bold"}} gutterBottom>
        Generate Images
      </Typography>

      {/* Input + Button */}
      <Box display="flex" sx={{mt:1, mb:4}} gap={2} width="100%" maxWidth={600}>
        <TextField
          fullWidth
          label="Enter a prompt"
          variant="outlined"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "50px", // curved input
            },
          }}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={generateImage}
          sx={{
            borderRadius: "50px",
            px: 4,
          }}
        >
          Generate
        </Button>
      </Box>

      {/* Images Output */}
      {imageUrls.length > 0 && (
        <Paper
          sx={{
            mt: 4,
            p: 2,
            borderRadius: 3,
            width: "100%",
            maxWidth: 800,
          }}
          elevation={3}
        >
          <Grid container spacing={2}>
            {imageUrls.map((url, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ borderRadius: 2 }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={url}
                    alt={`Generated ${index}`}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </Box>
  );
}

export default ImageGenerator;
