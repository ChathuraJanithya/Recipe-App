import express from "express";
import logger from "../../utils/logger.js";
import {
  getRecipesByCategory,
  getAllCategories,
  getRecipeById,
} from "../controllers/recipeController.js";

const recipeRouter = express.Router();

recipeRouter.get("/categories", getAllCategories);
recipeRouter.get("/categories/:category", getRecipesByCategory);
recipeRouter.get("/recipe/:id", getRecipeById);

export default recipeRouter;
