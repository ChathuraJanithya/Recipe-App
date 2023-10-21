import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const RecipeModal = ({ modalOpen, handleClose, recipe }) => {
  return (
    <Modal open={modalOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          {recipe.strMeal}
        </Typography>
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          style={{ maxWidth: "100%" }}
        />
        <Typography variant="body1" gutterBottom>
          Category: {recipe.strCategory}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Instructions: {recipe.strInstructions}
        </Typography>
        <Button onClick={handleClose} variant="contained" color="primary">
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default RecipeModal;
