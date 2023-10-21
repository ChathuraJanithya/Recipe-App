import logger from "../../utils/logger.js";
import axios from "axios";

const getRecipesByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    const recipes = response.data.meals;
    res.json({ recipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch recipes." });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const categories = response.data.categories;
    res.json({ categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch categories." });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const recipe = response.data.meals[0];
    res.json({ recipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch recipe." });
  }
};

module.exports = { getRecipesByCategory, getAllCategories, getRecipeById };
