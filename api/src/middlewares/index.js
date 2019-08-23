const { default: of } = require('await-of');
const { validationResult } = require('express-validator');
const bearerToken = require('express-bearer-token');

const { verifyJWT } = require('../services/jwt.services');
const { User, Profile } = require('../models/all-models');

exports.wrapRequest = fn => (req, res, next) => fn(req, res, next).catch(next);

const checkBearerToken = bearerToken({ headerKey: 'Bearer' });

const returnUser = async (token) => {
  const failResponse = false;
  try {
    const decodedToken = verifyJWT(token, { ignoreExpiration: true });

    if (!decodedToken || new Date(decodedToken.exp * 1000) <= new Date()) { return failResponse; }

    const [user, error] = await of(User.findById(decodedToken.id).exec());

    return (!user || error) ? failResponse
      : { user, decodedToken };
  } catch (error) {
    // console.error(error);
    return failResponse;
  }
};

exports.checkJwt = (strict = true) => [
  checkBearerToken,
  async (req, res, next) => {
    const { token } = req;

    const { user } = await returnUser(token);

    if (user) { req.user = user; }
    if (strict && !user) { return res.status(401).json('Unauthorized'); }

    next();
  },
];

exports.emailUsed = async email => (await User.count({ email }).exec()) > 0;

exports.handleUsed = async (handle, userId) => (await Profile.count({ handle, user: { $ne: userId } }).exec()) > 0;

exports.validate = (validationChain = []) => [
  ...validationChain,
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // const results = errors.array().map(({ msg, param }) => ({ [param]: msg }));
      const results = errors.array().reduce((acc, { msg, param }) =>
        ({
          ...acc,
          [param]: (param in acc) ? [...acc[param], msg] : [msg],
        }), {});

      return res.status(400).json(results);
    }

    next();
  },
];
