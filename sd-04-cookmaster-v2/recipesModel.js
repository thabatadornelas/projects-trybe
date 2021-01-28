const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createRecipeModel = async (recipe, userId) => {
  try {
    const db = await connection();
    const recipeCreate = await db.collection('recipes').insertOne({ ...recipe, userId });

    return { recipe: recipeCreate.ops[0] };
  } catch (err) {
    console.error('createRecipeModel', err.message);
  }
};

const getAllRecipesModel = async () =>
  connection().then((db) => db.collection('recipes').aggregate({}).toArray());

const getRecipeByIdModel = async (id) =>
  connection().then((db) => {
    if (!ObjectId.isValid(id)) return null;
    return db.collection('recipes').findOne(ObjectId(id));
  });

const updateRecipeModel = async ({ name, ingredients, preparation }, id) =>
  connection()
    .then((db) => db.collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));

const updateWithImageModel = async (id, imagePath) =>
  connection()
    .then((db) => db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { image: imagePath } }));

module.exports = {
  createRecipeModel,
  getAllRecipesModel,
  getRecipeByIdModel,
  updateRecipeModel,
  updateWithImageModel,
};
