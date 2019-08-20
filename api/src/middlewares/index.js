const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { default: of } = require('await-of');
const { validationResult } = require('express-validator');

const { jwtSecret } = require('../../config/keys.json');
const { User, Profile } = require('../models/all-models');

exports.wrapRequest = fn => (req, res, next) => fn(req, res, next).catch(next);

exports.passportJwtStrategy = (passport) => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
  };

  passport.use(new JwtStrategy(options, async (payload, done) => {
    const [user, error] = await of(User.findById(payload.id).exec());
    /* eslint-disable no-nested-ternary */
    return (error) ? done(error, false)
      : (user) ? done(null, user)
        : done(null, false);
    /* eslint-enable no-nested-ternary */
  }));
};

exports.emailUsed = async email => (await User.count({ email }).exec()) > 0;

exports.handleUsed = async (handle, userId) => (await Profile.count({ handle, user: { $ne: userId } }).exec()) > 0;

exports.validate = (validationChain = []) => [
  ...validationChain,
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // const results = errors.array().map(({ msg, param }) => ({ [param]: msg }));
      const results = errors.array().reduce((acc, { msg, param }) => ({ ...acc, [param]: msg }), {});

      return res.status(400).json(results);
    }

    next();
  },
];
