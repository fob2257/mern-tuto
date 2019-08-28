const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../../config/keys.dev');

exports.generateJWT = (payload, expiresIn) =>
  jwt.sign(payload, jwtSecret, { expiresIn });

exports.verifyJWT = (token, options = {}) => jwt.verify(token, jwtSecret, options);
