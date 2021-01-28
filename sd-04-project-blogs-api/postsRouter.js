const { Router } = require('express');
const { postsController } = require('../controller');
const middleware = require('../middlewares');
const { validateToken } = require('../service');

const postsRouter = Router();

postsRouter
  .post('/', validateToken, middleware.validatePosts, postsController.createPostsControl)
  .get('/', validateToken, postsController.listAllPostControl)
  .get('/:id', validateToken, postsController.getPostById)
  .put('/:id', validateToken, middleware.validatePosts, postsController.updatePost);

module.exports = postsRouter;
