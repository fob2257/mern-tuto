const router = require('express').Router({ mergeParams: true });

const { UsersController } = require('../../controllers/api');

router.route('/')
  .get(UsersController.getUserData);

router.route('/register/')
  .post(UsersController.registerUser);

router.route('/login/')
  .post(UsersController.logInUser);

module.exports = router;
