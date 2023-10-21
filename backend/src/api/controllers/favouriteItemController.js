import FavoriteItem from "../models/favouriteItemModel";

const addFavoriteRecipe = async (req, res) => {
  const { userId, idMeal, strMeal, strMealThumb } = req.body;

  try {
    const existingFavoriteItem = await FavoriteItem.findOne({
      userId,
      idMeal,
    });
    if (existingFavoriteItem) {
      return res.status(400).json({ message: "Recipe already exists" });
    }

    const favoriteItem = new FavoriteItem({
      userId,
      idMeal,
      strMeal,
      strMealThumb,
    });

    await favoriteItem.save();

    res.status(201).json(favoriteItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not add favorite recipe." });
  }
};

// Remove a favorite recipe
const removeFavoriteRecipe = async (req, res) => {
  const { itemId } = req.body;

  try {
    await FavoriteItem.deleteOne({ itemId });

    res.json({ message: "Favorite recipe removed successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not remove favorite recipe." });
  }
};

// Get all favorite recipes for a user
const getFavoriteRecipes = async (req, res) => {
  const { userId } = req.params;

  try {
    const favoriteRecipes = await FavoriteItem.find({ userId });

    res.json({ favoriteRecipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not fetch favorite recipes." });
  }
};

module.exports = {
  getFavoriteRecipes,
  addFavoriteRecipe,
  removeFavoriteRecipe,
};
