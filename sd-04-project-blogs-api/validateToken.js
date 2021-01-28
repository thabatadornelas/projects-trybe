const jwt = require('jsonwebtoken');

const secret = 'MinhaSenhaMuitoComplexa123';

const validateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    const data = jwt.verify(token, secret);

    const { email } = data;

    req.user = { email };

    next();
  } catch (err) {
    console.error('validateToken', err.message);
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = validateToken;
