const jwt = require('jsonwebtoken');

const secret = (process.env.JWT_SECRET) ? process.env.JWT_SECRET : 'c001ec58-0440-437a-8460-b1de698faf54';

exports.generateJWT = (payload, expiresIn) =>
  jwt.sign(payload, secret, { expiresIn });

exports.verifyJWT = token => jwt.verify(token, secret);
