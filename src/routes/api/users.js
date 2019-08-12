const router = require('express').Router({ mergeParams: true });
const passport = require('passport');
const { body } = require('express-validator');

const { emailUsed, validate } = require('../../middlewares');
const { UsersController } = require('../../controllers/api');

router.route('/register/')
  .post(validate([
    body('firstName')
      .isLength({ min: 2, max: 255 }).withMessage('First name must be minimum 2 characters long (255 max)'),
    body('lastName')
      .isLength({ min: 2, max: 255 }).withMessage('Last name must be minimum 2 characters long (255 max)'),
    body('email')
      .isEmail().withMessage('Must be a valid email')
      .custom(async (value) => {
        if (await emailUsed(value)) {
          // eslint-disable-next-line prefer-promise-reject-errors
          return Promise.reject('This email is already beign used');
        }
      }),
    body('password')
      .isLength({ min: 6, max: 255 }).withMessage('Password must be minimum 6 characters long (255 max)'),
  ]), UsersController.registerUser);

router.route('/login/')
  .post(validate([
    body('email')
      .isEmail().withMessage('Must be a valid email'),
    body('password')
      .optional(false).withMessage('Password is required'),
  ]), UsersController.logInUser);

router.route('/me/')
  .get(passport.authenticate('jwt', { session: false }), UsersController.myData);

module.exports = router;
