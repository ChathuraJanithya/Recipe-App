import express from "express";
import cors from "cors"; //cross-origin resource sharing : access control
import logger from "./utils/logger"; //UTILS
import "dotenv/config";
import { connect } from "./utils/database.connection";

const app = express();
const PORT = process.env.PORT || "8090";

app.use(cors());
app.use(express.json({ limit: "20mb" }));

app.get("/", (req, res, next) => {
  res.send("<h2> Recipe App</h2>");
  next();
});

import userRouter from "./api/routes/userRoutes.js";
app.use("/user", userRouter);

import recipeRouter from "./api/routes/recipeRoute.js";
app.use("/recipes", recipeRouter);

import favouriteItemRouter from "./api/routes/favouriteItemRoute.js";
app.use("/favouriteItems", favouriteItemRouter);

app.listen(PORT, () => {
  logger.info(`Server is up and running on ${PORT}`);
  connect();
});
