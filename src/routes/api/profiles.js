const router = require('express').Router({ mergeParams: true });
const passport = require('passport');
const { body } = require('express-validator');

const { handleUsed, validate } = require('../../middlewares');
const { ProfilesController } = require('../../controllers/api');

router.route('/')
  // .get(passport.authenticate('jwt', { session: false }), ProfilesController.myProfile)
  .post([
    passport.authenticate('jwt', { session: false }),
    validate([
      body('handle')
        .isLength({ min: 2, max: 40 }).withMessage('Handle must be minimum 2 characters long (40 max)')
        .custom(async (value, { req }) => {
          if (await handleUsed(value, req.user.id)) {
            throw new Error('This handle is already beign used');
          }
          return true;
        }),
      body('company')
        .optional()
        .isLength({ min: 2, max: 255 }).withMessage('Company must be minimum 2 characters long (255 max)'),
      body('website')
        .optional()
        .isURL().withMessage('Website must be a valid URL'),
      body('location')
        .optional()
        .isLength({ min: 2, max: 255 }).withMessage('Location must be minimum 2 characters long (255 max)'),
      body('status')
        .isLength({ min: 2, max: 255 }).withMessage('Status must be minimum 2 characters long (255 max)'),
      body('skills')
        .isArray().withMessage('Skills must be a valid array'),
      body('skills.*')
        .isLength({ min: 1 }).withMessage('Skill is required'),
      body('bio')
        .optional()
        .isLength({ min: 2, max: 255 }).withMessage('Bio must be minimum 2 characters long (255 max)'),
      body('githubUsername')
        .optional()
        .isLength({ min: 2, max: 255 }).withMessage('Github Username must be minimum 2 characters long (255 max)'),
      body('experience')
        .optional()
        .isArray().withMessage('Experience must be a valid array'),
      body('experience.*.title')
        .isLength({ min: 1 }).withMessage('Expirience title is required'),
      body('experience.*.company')
        .isLength({ min: 1 }).withMessage('Expirience company is required'),
      body('experience.*.location')
        .optional()
        .isLength({ min: 2, max: 255 }).withMessage('Location must be minimum 2 characters long (255 max)'),
      body('experience.*.from')
        .isISO8601().withMessage('Experience from must be a valid datetime'),
      body('experience.*.to')
        .optional()
        .isISO8601().withMessage('Experience to must be a valid datetime'),
      body('experience.*.current')
        .optional()
        .isBoolean().withMessage('Experience current value must be boolean'),
      body('experience.*.description')
        .optional()
        .isLength({ min: 2, max: 255 }).withMessage('Experience description must be minimum 2 characters long (255 max)'),
      body('education')
        .optional()
        .isArray().withMessage('Education must be a valid array'),
      body('education.*.school')
        .isLength({ min: 1 }).withMessage('Education school is required'),
      body('education.*.degree')
        .isLength({ min: 1 }).withMessage('Education degree is required'),
      body('education.*.fieldOfStudy')
        .isLength({ min: 1 }).withMessage('Education field of study is required'),
      body('education.*.from')
        .isISO8601().withMessage('Education from must be a valid datetime'),
      body('education.*.to')
        .optional()
        .isISO8601().withMessage('Education to must be a valid datetime'),
      body('education.*.current')
        .optional()
        .isBoolean().withMessage('Education current value must be boolean'),
      body('education.*.description')
        .optional()
        .isLength({ min: 2, max: 255 }).withMessage('Education description must be minimum 2 characters long (255 max)'),
      body('social')
        .optional()
        .custom((value) => {
          if (typeof value !== 'object') {
            throw new Error('Social must be a valid object');
          }
          return true;
        }),
      body('social.youtube')
        .optional()
        .isURL().withMessage('Social youtube must be a valid URL')
        .contains('youtube').withMessage('Social youtube must be a valid youtube URL'),
      body('social.twitter')
        .optional()
        .isURL().withMessage('Social twitter must be a valid URL')
        .contains('twitter').withMessage('Social twitter must be a valid twitter URL'),
      body('social.facebook')
        .optional()
        .isURL().withMessage('Social facebook must be a valid URL')
        .contains('facebook').withMessage('Social facebook must be a valid facebook URL'),
      body('social.linkedin')
        .optional()
        .isURL().withMessage('Social linkedin must be a valid URL')
        .contains('linkedin').withMessage('Social linkedin must be a valid linkedin URL'),
    ]),
  ], ProfilesController.createProfile);

module.exports = router;
