const connection = require('./connection');

const createUserModel = async ({ name, email, password, role = 'user' }) =>
  connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }))
    .then(({ insertId }) => ({ user: { name, email, password, role, _id: insertId } }));

const getByEmailModel = async (email) =>
  connection().then((db) => db.collection('users').findOne({ email }));

module.exports = {
  createUserModel,
  getByEmailModel,
};
