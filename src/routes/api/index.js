const apiRouter = require('express').Router({ mergeParams: true });

// apiRouter.use('/posts', require('./posts'));
// apiRouter.use('/profile', require('./profile'));
apiRouter.use('/users', require('./users'));

module.exports = apiRouter;
