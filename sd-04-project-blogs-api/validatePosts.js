const Joi = require('joi');

const schema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const validatePost = async (req, res, next) => {
  const { title, content } = req.body;

  const { error } = schema.validate({ title, content });

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

module.exports = validatePost;
