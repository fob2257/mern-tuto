const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../../config/keys.json');

exports.generateJWT = (payload, expiresIn) =>
  jwt.sign(payload, jwtSecret, { expiresIn });

exports.verifyJWT = token => jwt.verify(token, jwtSecret);
