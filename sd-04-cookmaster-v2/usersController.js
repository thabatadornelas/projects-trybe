const { userModels } = require('../model');
const { createToken } = require('../middlewares/auth');
const { errorsMessages } = require('../service');

const createUserController = async (req, res) => {
  try {
    const data = req.body;

    const userCreate = await userModels.createUserModel(data);

    return res.status(201).json(userCreate);
  } catch (err) {
    console.error('createUserController', err.message);
    return errorsMessages(res);
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModels.getByEmailModel(email);

    if (!user || user.email !== email || user.password !== password) {
      return errorsMessages(res, 'Incorrect username or password', 'unauthorized');
    }

    const { password: _, ...userData } = user;

    const token = createToken(userData);

    return res.status(200).json({ token });
  } catch (err) {
    console.error('loginController', err.message);
    return errorsMessages(res);
  }
};

module.exports = {
  createUserController,
  loginController,
};
