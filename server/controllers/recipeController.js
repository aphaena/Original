const Recipe = require('../models/recipeModel');

exports.addRecipe = async (req, res) => {
  const recipe = await Recipe.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      recipe,
    },
  });
};

exports.updateRecipe = async (req, res) => {
  const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      recipe,
    },
  });
};

exports.deleteRecipe = async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
