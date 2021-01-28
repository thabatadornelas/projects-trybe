const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const { error } = schema.validate({ email, password });

  // explicação Tereza

  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

module.exports = validateLogin;
