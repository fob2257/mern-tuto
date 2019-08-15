const apiRouter = require('express').Router({ mergeParams: true });

const { wrapRequest } = require('../../middlewares');

apiRouter.use((req, res, next) => wrapRequest(next()));

// apiRouter.use('/posts', require('./posts'));
apiRouter.use('/profiles', require('./profiles'));
apiRouter.use('/users', require('./users'));

module.exports = apiRouter;
