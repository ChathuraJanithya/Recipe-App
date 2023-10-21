import express from "express";
import logger from "../../utils/logger.js";

import {
  getFavoriteRecipes,
  addFavoriteRecipe,
  removeFavoriteRecipe,
} from "../controllers/favouriteItemController.js";

const favouriteItemRouter = express.Router();

favouriteItemRouter.get("/:userId", getFavoriteRecipes);
favouriteItemRouter.post("/", addFavoriteRecipe);
favouriteItemRouter.delete("/:itemId", removeFavoriteRecipe);

export default favouriteItemRouter;
