const jwt = require('jsonwebtoken');
const { errorsMessages } = require('../service');

const secret = 'MinhaSenhaMuitoComplexa123';

const createToken = (payload) => {
  const headers = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, secret, headers);

  return token;
};

const validateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return errorsMessages(res, 'missing auth token', 'unauthorized');
    }
    const data = jwt.verify(token, secret);

    const { iat, exp, ...userData } = data;
    req.user = userData;

    next();
  } catch (err) {
    console.error('validateToken', err.message);
    return errorsMessages(res, 'jwt malformed', 'unauthorized');
  }
};

module.exports = {
  createToken,
  validateToken,
};
