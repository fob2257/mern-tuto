const router = require('express').Router({ mergeParams: true });
const { body, param, query } = require('express-validator');

const { checkJwt, handleUsed, validate } = require('../../middlewares');
const { ProfilesController } = require('../../controllers/api');

router.route('/')
  .get([
    checkJwt(false),
    validate([
      query('only')
        .optional()
        .isBoolean().withMessage('Only must be a valid boolean value').toBoolean(),
    ]),
  ], ProfilesController.getProfiles)
  .post([
    checkJwt(),
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
        .isLength({ min: 2, max: 255 }).withMessage('Status is required'),
      body('skills')
        .isArray().withMessage('Skills are required'),
      body('skills.*')
        .isLength({ min: 1 }).withMessage('A skill is required'),
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

router.route('/experience/')
  .post([
    checkJwt(),
    validate([
      body('title')
        .isLength({ min: 1 }).withMessage('Expirience title is required'),
      body('company')
        .isLength({ min: 1 }).withMessage('Expirience company is required'),
      body('location')
        .optional()
        .isLength({ min: 2, max: 255 }).withMessage('Location must be minimum 2 characters long (255 max)'),
      body('from')
        .isISO8601().withMessage('Experience from must be a valid datetime'),
      body('current')
        .optional()
        .isBoolean().withMessage('Experience current value must be boolean'),
      body('to')
        .custom((value, options) => {
          const { req: { body: { current, from } } } = options;

          if (!value && !current) {
            throw new Error('This date is required if is not your actual job');
          }
          if (value && !current && new Date(value).getTime() <= new Date(from).getTime()) {
            throw new Error('This date cannot be lower or equal than from datetime');
          }
          return true;
        })
        .if((value, { req }) => !req.body.current)
        .isISO8601().withMessage('Experience to must be a valid datetime'),
      body('description')
        .optional()
        .isLength({ min: 2, max: 255 }).withMessage('Experience description must be minimum 2 characters long (255 max)'),
    ]),
  ], ProfilesController.createExperience);

router.route('/experience/:id/')
  .delete([
    checkJwt(),
    validate([
      param('id')
        .isMongoId().withMessage('Expirience id must be a valid mongo id type'),
    ]),
  ], ProfilesController.deleteExperience);

router.route('/education/')
  .post([
    checkJwt(),
    validate([
      body('school')
        .isLength({ min: 1 }).withMessage('Education school is required'),
      body('degree')
        .isLength({ min: 1 }).withMessage('Education degree is required'),
      body('fieldOfStudy')
        .isLength({ min: 1 }).withMessage('Education field of study is required'),
      body('from')
        .isISO8601().withMessage('Education from must be a valid datetime'),
      body('current')
        .optional()
        .isBoolean().withMessage('Education current value must be boolean'),
      body('to')
        .custom((value, options) => {
          const { req: { body: { current, from } } } = options;

          if (!value && !current) {
            throw new Error('This date is required if is not your actual field study');
          }
          if (value && !current && new Date(value).getTime() <= new Date(from).getTime()) {
            throw new Error('This date cannot be lower or equal than from datetime');
          }
          return true;
        })
        .if((value, { req }) => !req.body.current)
        .isISO8601().withMessage('Education to must be a valid datetime'),
      body('description')
        .optional()
        .isLength({ min: 2, max: 255 }).withMessage('Education description must be minimum 2 characters long (255 max)'),
    ]),
  ], ProfilesController.createEducation);

router.route('/education/:id/')
  .delete([
    checkJwt(),
    validate([
      param('id')
        .isMongoId().withMessage('Education id must be a valid mongo id type'),
    ]),
  ], ProfilesController.deleteEducation);

router.route('/handle/:handle/')
  .get([
    validate([
      param('handle')
        .isLength({ min: 1 }).withMessage('Handle is required'),
    ]),
  ], ProfilesController.getProfileByHandle);

router.route('/:id/')
  .get([
    validate([
      param('id')
        .isMongoId().withMessage('Profile id must be a valid mongo id type'),
    ]),
  ], ProfilesController.getProfile)
  .put([
    checkJwt(),
    validate([
      param('id')
        .isMongoId().withMessage('Profile id must be a valid mongo id type'),
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
        .isLength({ max: 255 }).withMessage('Company must be minimum 2 characters long (255 max)'),
      body('website')
        .optional()
        .isURL().withMessage('Website must be a valid URL'),
      body('location')
        .optional()
        .isLength({ max: 255 }).withMessage('Location must be minimum 2 characters long (255 max)'),
      body('status')
        .isLength({ min: 2, max: 255 }).withMessage('Status is required'),
      body('skills')
        .isArray().withMessage('Skills are required'),
      body('skills.*')
        .isLength({ min: 1 }).withMessage('A skill is required'),
      body('bio')
        .optional()
        .isLength({ max: 255 }).withMessage('Bio must be minimum 2 characters long (255 max)'),
      body('githubUsername')
        .optional()
        .isLength({ max: 255 }).withMessage('Github Username must be minimum 2 characters long (255 max)'),
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
  ], ProfilesController.updateProfile)
  .delete([
    checkJwt(),
    validate([
      param('id')
        .isMongoId().withMessage('Profile id must be a valid mongo id type'),
    ]),
  ], ProfilesController.deleteProfile);

module.exports = router;
