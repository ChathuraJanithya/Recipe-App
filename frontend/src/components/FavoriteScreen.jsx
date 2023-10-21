import React, { useState, useEffect } from "react";
import "../styles/FavoriteSecreen.css";
import axios from "axios";

const FavouriteScreen = () => {
  const [userId, setUserId] = useState("");
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      const userData = JSON.parse(localStorage.getItem("userData"));
      setUserId(userData._id);
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location = "/";
  };

  // Fetch favorite recipes
  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8090/favouriteItems/${userId}`)
        .then((response) => {
          if (Array.isArray(response.data.favoriteRecipes)) {
            setFavoriteRecipes(response.data.favoriteRecipes);
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
  }, [userId]);

  const removeFavoriteRecipe = (recipe) => {
    setFavoriteRecipes((prevRecipes) =>
      prevRecipes.filter((r) => r.idMeal !== recipe.idMeal)
    );

    axios.delete(`http://localhost:8090/favouriteItems/${recipe._id}`).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <div id="main-div">
      <header className="header">
        <div className="cart-header">
          <h2 id="main-heding">Cook</h2>

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
      <br />
      <div className="cart-content-div">
        {favoriteRecipes.map((favoriteRecipe) => (
          <div className="cart-item" key={favoriteRecipe.idMeal}>
            <img
              className="logoicon"
              src={favoriteRecipe.strMealThumb}
              alt={favoriteRecipe.strMeal}
            />
            <label className="item-lebel-catagory">
              {favoriteRecipe.strCategory}
            </label>
            <b>
              <label className="item-lebel-name">
                {favoriteRecipe.strMeal}
              </label>
            </b>
            <button
              className="favorite-button"
              onClick={() => removeFavoriteRecipe(favoriteRecipe)}
            >
              {!favoriteRecipe.favorite ? "❤️" : "🤍"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FavouriteScreen;
