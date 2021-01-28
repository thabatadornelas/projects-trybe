const jwt = require('jsonwebtoken');

const secret = 'MinhaSenhaMuitoComplexa123';

const createToken = (payload) => { // explicação Tereza
  const headers = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, secret, headers);

  return token;
};

module.exports = createToken;
