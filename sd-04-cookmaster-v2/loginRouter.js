const { Router } = require('express');
const { usersController } = require('../controller');
const validations = require('../service');

const loginRouter = Router();

loginRouter.post(
  '/',
  validations.userService.validLogin,
  usersController.loginController,
);

module.exports = loginRouter;
