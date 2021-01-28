const { Users } = require('../models');
const { createToken } = require('../service');

const createUserControl = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const userMail = await Users.findAll({ where: { email } });
  if (userMail.length > 0) {
    return res.status(409).json({ message: 'Usuário já existe' });
  }

  await Users.create({ displayName, email, password, image });
  const token = createToken({ email, password });
  return res.status(201).json({ token });
};

const loginUserControl = async (req, res) => {
  const { email, password } = req.body;

  const userMail = await Users.findAll({ where: { email } });
  if (userMail <= 0) {
    return res.status(400).json({ message: 'Campos inválidos' });
  }

  const token = createToken({ email, password });
  return res.status(200).json({ token });
};

const getAllUserControl = async (_req, res) => {
  const allUsers = await Users.findAll({ attributes: { exclude: ['password'] } });
  return res.status(200).json(allUsers);
};

const getUserId = async (req, res) => {
  const { id } = req.params;
  const user = await Users.findOne({ where: { id } });
  if (!user) {
    return res.status(404).json({ message: 'Usuário não existe' });
  }
  return res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.body;

  Users.destroy({ where: { id } });
  // não precisa do await, espera o retorno de uma promise
  // o sequelize não está retornando um promise
  return res.status(204).json();
};

module.exports = {
  createUserControl,
  loginUserControl,
  getAllUserControl,
  getUserId,
  deleteUser,
};
