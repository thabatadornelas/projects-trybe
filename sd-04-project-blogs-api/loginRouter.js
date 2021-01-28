const { Router } = require('express');
const { userController } = require('../controller');
const middlewares = require('../middlewares');

const loginRouter = Router();

loginRouter.post('/', middlewares.validateLogin, userController.loginUserControl);

module.exports = loginRouter;
