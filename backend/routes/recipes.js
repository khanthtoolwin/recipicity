const express = require("express");
const RecipeController = require("../controllers/RecipeController");
const router = express.Router();
const { body } = require("express-validator");
const handleErrorMessage = require("../middlewares/handleErrorMessage");
// get all recipes
router.get("", RecipeController.index);

// store a recipe

router.post(
  "",
  [
    body("title").notEmpty(),
    body("description").notEmpty(),
    body("ingredients").notEmpty().isArray({ min: 3 }),
  ],
  handleErrorMessage,
  RecipeController.store,
);

// show recipe details
router.get("/:id", RecipeController.show);

// delete a recipe
router.delete("/:id", RecipeController.destroy);

// update recipe info
router.patch("/:id", RecipeController.update);

module.exports = router;
