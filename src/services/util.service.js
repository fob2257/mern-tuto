const bcrypt = require('bcryptjs');

const saltRounds = (process.env.SALT_ROUNDS) ? Number.parseInt(process.env.SALT_ROUNDS, 10) : 10;

exports.generateSalt = () => bcrypt.genSalt(saltRounds);

exports.hashPassword = (pwd, salt) => bcrypt.hash(pwd, salt);

exports.comparePassword = (pwd, hash) => bcrypt.compare(pwd, hash);

exports.camelCaseWord = (word = '') => word.split(' ').map(x => x.charAt(0).toUpperCase() + x.toLowerCase().substring(1)).join(' ');
