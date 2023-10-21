import mongoose from "mongoose";

const favoriteItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  idMeal: {
    type: String,
    required: true,
  },
  strMeal: {
    type: String,
    required: true,
  },
  strMealThumb: {
    type: String,
    required: true,
  },
});

const FavoriteItem = mongoose.model("FavoriteItem", favoriteItemSchema);

module.exports = FavoriteItem;
