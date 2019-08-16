const router = require('express').Router({ mergeParams: true });
const passport = require('passport');
const { body, param } = require('express-validator');

const { validate } = require('../../middlewares');
const { PostsController } = require('../../controllers/api');

router.route('/')
  .get(PostsController.getPosts)
  .post([
    passport.authenticate('jwt', { session: false }),
    validate([
      body('text')
        .isLength({ min: 2, max: 255 }).withMessage('Text must be minimum 2 characters long (255 max)'),
    ]),
  ], PostsController.createPost);

router.route('/:id/like/')
  .post([
    passport.authenticate('jwt', { session: false }),
    validate([
      param('id')
        .isMongoId().withMessage('Post id must be a valid mongo id type'),
    ]),
  ], PostsController.createLike);

router.route('/:id/comment/')
  .post([
    passport.authenticate('jwt', { session: false }),
    validate([
      param('id')
        .isMongoId().withMessage('Post id must be a valid mongo id type'),
      body('text')
        .isLength({ min: 2, max: 255 }).withMessage('Text must be minimum 2 characters long (255 max)'),
    ]),
  ], PostsController.createComment);

router.route('/:postId/comment/:commentId/')
  .delete([
    passport.authenticate('jwt', { session: false }),
    validate([
      param('postId')
        .isMongoId().withMessage('Post id must be a valid mongo id type'),
      param('commentId')
        .isMongoId().withMessage('Comment id must be a valid mongo id type'),
    ]),
  ], PostsController.deleteComment);

router.route('/:id/')
  .get([
    validate([
      param('id')
        .isMongoId().withMessage('Post id must be a valid mongo id type'),
    ]),
  ], PostsController.getPost)
  .delete([
    passport.authenticate('jwt', { session: false }),
    validate([
      param('id')
        .isMongoId().withMessage('Post id must be a valid mongo id type'),
    ]),
  ], PostsController.deletePost);

module.exports = router;
