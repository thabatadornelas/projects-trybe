const { Router } = require('express');
const { usersController } = require('../controller');
const validations = require('../service');

const userRouter = Router();

userRouter.post(
  '/',
  validations.userService.validCreateUser,
  validations.userService.emailValidator,
  usersController.createUserController,
);

module.exports = userRouter;
