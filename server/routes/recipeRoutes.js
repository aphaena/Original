const express = require('express');
const recipeController = require('../controllers/recipeController');
const router = express.Router();

router.post('/recipe', recipeController.addRecipe);
router.patch('/recipe/:id', recipeController.updateRecipe);
router.delete('/recipe/:id', recipeController.deleteRecipe);

module.exports = router;