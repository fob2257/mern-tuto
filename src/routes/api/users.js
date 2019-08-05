const router = require('express').Router({ mergeParams: true });
const passport = require('passport');
const Joi = require('@hapi/joi');
const validate = require('express-joi-validator');

const { UsersController } = require('../../controllers/api');

router.route('/register/')
  .post(validate({
    body: {
      firstName: Joi.string().min(2).max(255).required(),
      lastName: Joi.string().min(2).max(255).required(),
      email: Joi.string().email({ minDomainSegments: 2 }).max(255).required(),
      password: Joi.string().min(6).max(255).required(),
    },
  }), UsersController.registerUser);

router.route('/login/')
  .post(validate({
    body: {
      email: Joi.string().email({ minDomainSegments: 2 }).max(255).required(),
      password: Joi.string().max(255).required(),
    },
  }), UsersController.logInUser);

router.route('/me/')
  .get(passport.authenticate('jwt', { session: false }), UsersController.myData);

module.exports = router;
