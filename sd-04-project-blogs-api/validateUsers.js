const Joi = require('joi');

const schema = Joi.object({
  displayName: Joi.string().min(8),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string(),
});

const validateUser = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const { error } = schema.validate({ displayName, email, password, image });
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

module.exports = validateUser;
