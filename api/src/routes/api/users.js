const router = require('express').Router({ mergeParams: true });
const { body, param } = require('express-validator');

const { checkJwt, emailUsed, validate } = require('../../middlewares');
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
          throw new Error('This email is already beign used');
        }
        return true;
      }),
    body('password')
      .isLength({ min: 6, max: 255 }).withMessage('Password must be minimum 6 characters long (255 max)'),
    body('password2')
      .isLength({ min: 6, max: 255 }).withMessage('Confirm password must be minimum 6 characters long (255 max)')
      .custom((value, { req: { body: { password } } }) => {
        if (password !== value) {
          throw new Error('Confirm password did not matched');
        }
        return true;
      }),
  ]), UsersController.registerUser);

router.route('/login/')
  .post(validate([
    body('email')
      .isEmail().withMessage('Must be a valid email'),
    body('password')
      .isLength({ min: 1 }).withMessage('Password is required'),
  ]), UsersController.logInUser);

router.route('/refresh/')
  .post(checkJwt(), UsersController.refreshToken);

router.route('/me/')
  .get(checkJwt(), UsersController.myData)
  .delete(checkJwt(), UsersController.deleteMyData);

router.route('/:id/profile/')
  .get([
    validate([
      param('id')
        .isMongoId().withMessage('User id must be a valid mongo id type'),
    ]),
  ], UsersController.getUserProfile);

module.exports = router;
