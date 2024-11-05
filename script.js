// Sample API URL for demonstration
const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

document.addEventListener("DOMContentLoaded", function() {
  // Check which page we're on and load appropriate functions
  if (document.querySelector("#recipe-list")) {
    loadPopularRecipes();
  }
});

// Load popular recipes on the home page
async function loadPopularRecipes() {
  try {
    const response = await fetch(`${API_URL}chicken`);
    const data = await response.json();
    displayRecipes(data.meals, "recipe-list");
  } catch (error) {
    console.error("Error loading popular recipes:", error);
  }
}

// Search for recipes on the search page
async function searchRecipes() {
  const query = document.getElementById("search-input").value;
  if (!query) return alert("Please enter a search term!");

  try {
    const response = await fetch(`${API_URL}${query}`);
    const data = await response.json();
    displayRecipes(data.meals, "search-results");
  } catch (error) {
    console.error("Error searching recipes:", error);
  }
}

// Display recipes in the specified container
function displayRecipes(recipes, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  if (recipes) {
    recipes.forEach(recipe => {
      const recipeCard = document.createElement("div");
      recipeCard.className = "recipe-card";
      recipeCard.innerHTML = `
        <h3>${recipe.strMeal}</h3>
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
        <p><a href="recipe.html?id=${recipe.idMeal}">View Recipe</a></p>
      `;
      container.appendChild(recipeCard);
    });
  } else {
    container.innerHTML = "<p>No recipes found!</p>";
  }
}

// Fetch and display a recipe's details on the recipe page
async function loadRecipeDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get("id");

  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
    const data = await response.json();
    displayRecipeDetails(data.meals[0]);
  } catch (error) {
    console.error("Error loading recipe details:", error);
  }
}

function displayRecipeDetails(recipe) {
  const container = document.getElementById("recipe-detail");
  container.innerHTML = `
    <h2>${recipe.strMeal}</h2>
    <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
    <p><strong>Category:</strong> ${recipe.strCategory}</p>
    <p><strong>Area:</strong> ${recipe.strArea}</p>
    <p>${recipe.strInstructions}</p>
  `;
}
