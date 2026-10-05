const Recipe = require("../models/Recipe");
const mongoose = require("mongoose");
const RecipeController = {
  index: async (req, res) => {
    let limit = 6;
    let page = req.query.page || 1;
    let recipes = await Recipe.find()
      .skip((page - 1) * limit) // (3-1) * 6 = 12 ... skip 12 recipes
      .limit(limit)
      .sort({ createdAt: -1 });

    let totalRecipeCount = await Recipe.countDocuments(); // mongoDB built-in function
    let totalPageCount = Math.ceil(totalRecipeCount / limit);

    let links = {
      previousPage: page == 1 ? false : true,
      nextPage: totalPageCount == page ? false : true,
      currentPage: page,
      loopableLinks: [],
    };

    // generate loopable links
    for (let index = 0; index < totalPageCount; index++) {
      links.loopableLinks.push({ number: index + 1 });
    }
    console.log(links);

    let response = {
      links,
      data: recipes,
    };
    res.json(response);
  },

  store: async (req, res) => {
    const { title, description, ingredients } = req.body;

    const recipe = await Recipe.create({
      title,
      description,
      ingredients,
    });
    res.json(recipe);
  },

  show: async (req, res) => {
    try {
      let recipeId = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(recipeId)) {
        return res.status(400).json({ msg: "Invalid Id" });
      }
      let recipe = await Recipe.findById(recipeId);
      if (!recipe) {
        return res.status(404).json({ msg: "Recipe not found" });
      }
      return res.json(recipe);
    } catch (error) {
      return res.status(500).json({ msg: "Internal server error" });
    }
  },

  destroy: async (req, res) => {
    try {
      let recipeId = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(recipeId)) {
        return res.status(400).json({ msg: "Invalid id" });
      }
      let recipe = await Recipe.findByIdAndDelete(recipeId);
      if (!recipe) {
        return res.status(404).json({ msg: "No recipe found." });
      }
      return res.json(recipe);
    } catch (error) {
      return res.status(500).json({ msg: "Internal server error." });
    }
  },

  update: async (req, res) => {
    try {
      let recipeId = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(recipeId)) {
        return res.status(400).json({ msg: "not a valid Id" });
      }
      let recipe = await Recipe.findByIdAndUpdate(recipeId, {
        ...req.body,
      });
      if (!recipe) {
        return res.status(404).json({ msg: "Recipe not found" });
      }
      let updatedRecipe = req.body;

      return res.json(updatedRecipe);
    } catch (error) {
      res.status(500).json({ msg: "Internal server error." });
    }
  },
};

module.exports = RecipeController;
