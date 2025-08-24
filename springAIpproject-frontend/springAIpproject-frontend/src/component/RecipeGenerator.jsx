import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Box,
  Fade,
} from "@mui/material";

function RecipeGenerator() {
  const [ingredients, setIngredients] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [recipe, setRecipe] = useState("");
  const [showResponse, setShowResponse] = useState(false);

  const createRecipe = async (e) => {
    if (e) e.preventDefault(); // prevent page refresh on Enter

    if (!ingredients.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:8080/recipe-creator?ingredients=${ingredients}&cuisine=${cuisine}&dietaryRestrictions=${dietaryRestrictions}`
      );
      const data = await response.text();

      // reset fade effect before showing new recipe
      setShowResponse(false);
      setTimeout(() => {
        setRecipe(data);
        setShowResponse(true);
      }, 50);
    } catch (error) {
      console.error("Error generating recipe: ", error);
    }
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ mb: 3, fontWeight: "bold" }}
      >
        Let's COOK !
      </Typography>

      {/* Wrap everything inside a form so Enter triggers submit */}
      <form onSubmit={createRecipe}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={10} md={6}>
            <TextField
              fullWidth
              label="Ingredients (comma separated)"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
          </Grid>

          <Grid item xs={5} md={3}>
            <TextField
              fullWidth
              label="Cuisine"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
            />
          </Grid>

          <Grid item xs={5} md={3}>
            <TextField
              fullWidth
              label="Dietary Restrictions"
              value={dietaryRestrictions}
              onChange={(e) => setDietaryRestrictions(e.target.value)}
            />
          </Grid>

          <Grid item xs={10} md={6}>
            <Button
              type="submit" // now Enter key works
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                borderRadius: "50px",
                padding: "10px 20px",
                mt: 2,
                mb: 2,
                textTransform: "none",
                fontSize: "15px"
              }}
            >
              Create Recipe
            </Button>
          </Grid>
        </Grid>
      </form>

      {recipe && (
        <Grid container justifyContent="center">
          <Grid item xs={10} md={8}>
            <Fade in={showResponse} timeout={800}>
              <Paper
                sx={{
                  mt: 3,
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "grey.900",
                  color: "white",
                  boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                elevation={6}
              >
                <Typography
                  variant="body1"
                  component="pre"
                  sx={{ whiteSpace: "pre-wrap", fontStyle: "italic" }}
                >
                  🍲 {recipe}
                </Typography>
              </Paper>
            </Fade>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default RecipeGenerator;
