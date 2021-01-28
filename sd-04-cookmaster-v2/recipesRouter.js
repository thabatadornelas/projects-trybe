const { Router } = require('express');
const { recipesController } = require('../controller');
const { validateToken } = require('../middlewares/auth');
const { recipeService, uploadImage } = require('../service');

const recipesRouter = Router();

recipesRouter.post(
  '/',
  validateToken,
  recipeService,
  recipesController.createRecipeController,
);

recipesRouter.get('/', recipesController.getAllRecipesController);

recipesRouter.put(
  '/:id/image/',
  validateToken,
  uploadImage,
  recipesController.uploadWithImageController,
);

recipesRouter.get('/:id', recipesController.getRecipeByIdController);
recipesRouter.put('/:id', validateToken, recipesController.updateRecipeController);

module.exports = recipesRouter;
