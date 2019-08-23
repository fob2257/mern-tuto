const router = require('express').Router({ mergeParams: true });
const { body, param } = require('express-validator');

const { checkJwt, validate } = require('../../middlewares');
const { PostsController } = require('../../controllers/api');

router.route('/')
  .get(PostsController.getPosts)
  .post([
    checkJwt(),
    validate([
      body('text')
        .isLength({ min: 2, max: 255 }).withMessage('Text must be minimum 2 characters long (255 max)'),
    ]),
  ], PostsController.createPost);

router.route('/:id/like/')
  .post([
    checkJwt(),
    validate([
      param('id')
        .isMongoId().withMessage('Post id must be a valid mongo id type'),
    ]),
  ], PostsController.createLike);

router.route('/:id/comment/')
  .post([
    checkJwt(),
    validate([
      param('id')
        .isMongoId().withMessage('Post id must be a valid mongo id type'),
      body('text')
        .isLength({ min: 2, max: 255 }).withMessage('Text must be minimum 2 characters long (255 max)'),
    ]),
  ], PostsController.createComment);

router.route('/:postId/comment/:commentId/')
  .delete([
    checkJwt(),
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
    checkJwt(),
    validate([
      param('id')
        .isMongoId().withMessage('Post id must be a valid mongo id type'),
    ]),
  ], PostsController.deletePost);

module.exports = router;
