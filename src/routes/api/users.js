const router = require('express').Router({ mergeParams: true });

const { UsersController } = require('../../controllers/api');

router.route('/')
  .get(UsersController.getIndex);

module.exports = router;
