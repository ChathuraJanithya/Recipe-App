import React, { useState, useEffect } from "react";
import "../styles/ItemCartScreen.css";
import axios from "axios";
import RecipeModal from "./RecipeModal";

const ItemCartScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userId, setUserId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      const userData = JSON.parse(localStorage.getItem("userData"));
      setUserFirstName(userData.firstName);
      setUserId(userData._id);
    }
  }, [userId]);

  // Fetch categories
  useEffect(() => {
    axios
      .get("https://recipe-app-production-6f22.up.railway.app/categories")
      .then((response) => {
        if (Array.isArray(response.data.categories)) {
          setCategories(response.data.categories);
        } else {
          console.error(
            "Categories data is not an array:",
            response.data.categories
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching categories: ", error);
      });
  }, []);

  // Fetch recipes based on the selected category
  useEffect(() => {
    if (selectedCategory) {
      axios
        .get(`http://localhost:8090/recipes/categories/${selectedCategory}`)
        .then((response) => {
          if (Array.isArray(response.data.recipes)) {
            setRecipes(response.data.recipes);
          } else {
            console.error(
              "Recipes data is not an array:",
              response.data.recipes
            );
          }
        })
        .catch((error) => {
          console.error("Error fetching recipes: ", error);
        });
    }
  }, [selectedCategory]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location = "/";
  };

  // Add recipe to favorites
  const addFavoriteRecipe = (recipe) => {
    const updatedRecipes = recipes.map((r) =>
      r.idMeal === recipe.idMeal ? { ...r, favorite: true } : r
    );
    setRecipes(updatedRecipes);
    const recipeData = {
      userId: userId,
      idMeal: recipe.idMeal,
      strMeal: recipe.strMeal,
      strMealThumb: recipe.strMealThumb,
    };
    axios
      .post(`http://localhost:8090/favouriteItems/`, recipeData)
      .then((response) => {
        console.log("response : ", response);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert("Recipe already exists in favorites");
        }
        console.error("Error adding recipe to favorites: ", error);
      });
  };

  //view recipe
  const viewRecipe = (recipe) => {
    axios
      .get(`http://localhost:8090/recipes/recipe/${recipe.idMeal}`)
      .then((response) => {
        if (response.data && response.data.recipe) {
          // Check if "recipe" property exists in the response data
          const recipeData = response.data.recipe;
          setRecipe(recipeData);
          setModalOpen(true);
        } else {
          console.error(
            "Recipe data not found in the response:",
            response.data
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching recipe: ", error);
      });
  };

  return (
    <div id="main-div">
      <header className="header">
        <div className="cart-header">
          <h2 id="main-heding">Cook</h2>
          <h2 className="user-greeting">Hello, {userFirstName}</h2>
          <div className="link-button">
            <br />
            <a href="/cart" className="header-button">
              Home
            </a>
            <a href="/favorite" className="header-button">
              Favorite
            </a>
          </div>

          <a href="/" id="header-icon" onClick={handleLogout}>
            <img
              src="https://static.thenounproject.com/png/3163172-200.png"
              alt="Logout Icon"
              width="24"
              height="24"
            />
          </a>
        </div>
      </header>
      <br />
      <div className="item-type-bar">
        {categories.slice(1, 6).map((category) => (
          <button
            className="item-type-button-bar"
            key={category.idCategory}
            onClick={() => setSelectedCategory(category.strCategory)}
          >
            {category.strCategory}
          </button>
        ))}
      </div>
      <div className="cart-content-div">
        {recipes.map((recipe) => (
          <div className="cart-item" key={recipe.idMeal}>
            <img
              className="logoicon"
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              onClick={() => viewRecipe(recipe)}
            />
            <label className="item-lebel-catagory">{recipe.strCategory}</label>
            <b>
              <label className="item-lebel-name">{recipe.strMeal}</label>
            </b>
            <button
              className="favorite-button"
              onClick={() => addFavoriteRecipe(recipe)}
            >
              {recipe.favorite ? "❤️" : "🤍"}
            </button>
          </div>
        ))}
      </div>

      {/* modal */}
      <RecipeModal
        modalOpen={modalOpen}
        handleClose={() => setModalOpen(false)}
        recipe={recipe}
      />
    </div>
  );
};

export default ItemCartScreen;
