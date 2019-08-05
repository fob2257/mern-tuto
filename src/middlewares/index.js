const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { default: of } = require('await-of');

const { jwtSecret } = require('../../config/keys.json');
const { User } = require('../models/all-models');

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
