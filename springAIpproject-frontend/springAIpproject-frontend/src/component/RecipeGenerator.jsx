import React, { useState } from "react";

function RecipeGenerator() {
  const [ingredients, setIngredients] = useState("");
  const [cuisine, setCuisine] = useState("any");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [recipe, setRecipe] = useState("");

  const createRecipe = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/recipe-creator?ingredients=${encodeURIComponent(
          ingredients
        )}&cuisine=${encodeURIComponent(
          cuisine
        )}&dietaryRestrictions=${encodeURIComponent(dietaryRestrictions)}`
      );
      const data = await response.text();
      console.log(data);
      setRecipe(data);
    } catch (error) {
      console.error("Error generating recipe: ", error);
    }
  };

  return (
    <div className="recipe-generator">
      <h2>Recipe Generator</h2>

      <input
        type="text"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter ingredients (comma separated)"
      />

      <input
        type="text"
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
        placeholder="Enter cuisine (e.g., Italian, Indian)"
      />

      <input
        type="text"
        value={dietaryRestrictions}
        onChange={(e) => setDietaryRestrictions(e.target.value)}
        placeholder="Enter dietary restrictions (optional)"
      />

      <button onClick={createRecipe}>Create Recipe</button>

      <div className="output">
        <h3>Generated Recipe:</h3>
        <pre className="recipe-text">{recipe}</pre>
      </div>
    </div>
  );
}

export default RecipeGenerator;
