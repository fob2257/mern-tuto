const router = require('express').Router({ mergeParams: true });
const passport = require('passport');

const { UsersController } = require('../../controllers/api');

router.route('/register/')
  .post(UsersController.registerUser);

router.route('/login/')
  .post(UsersController.logInUser);

router.route('/me/')
  .get(passport.authenticate('jwt', { session: false }), UsersController.myData);

module.exports = router;
