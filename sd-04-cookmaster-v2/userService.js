const errorsMessages = require('./errorsMessages');
const { userModels } = require('../model');

const validCreateUser = (req, res, next) => {
  const { name, email, password } = req.body;
  const emailValid = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;

  if (!name || !email || !password || !emailValid.test(email)) {
    return errorsMessages(res, 'Invalid entries. Try again.', 'bad_request');
  }
  next();
};

const emailValidator = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existOrNotEmail = await userModels.getByEmailModel(email);
    if (existOrNotEmail) {
      return errorsMessages(res, 'Email already registered', 'conflict');
    }
    next();
  } catch (err) {
    console.error('validationExistProd', err.message);
  }
};

const validLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return errorsMessages(res, 'All fields must be filled', 'unauthorized');
  }
  next();
};

module.exports = {
  validCreateUser,
  emailValidator,
  validLogin,
};
