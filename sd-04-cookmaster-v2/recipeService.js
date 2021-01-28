const errorsMessages = require('./errorsMessages');

const validCreateRecipe = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  // console.log('if', !ingredients);
  if (!name || !ingredients || !preparation) {
    return errorsMessages(res, 'Invalid entries. Try again.', 'bad_request');
  }
  next();
};


module.exports = validCreateRecipe;
