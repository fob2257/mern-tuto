/* eslint-disable global-require,max-len */
const controllers = {
  UsersController: require('./users.controller'),
};

const wrapAsync = fn => (req, res, next) => fn(req, res, next).catch(next);
// const wrapAsyncBulk = (fns = []) => (req, res, next) => fns.map(fn => fn(req, res, next).catch(next));

Object.keys(controllers)
  .forEach(controller => Object.keys(controllers[controller])
    .forEach((handler) => { controllers[controller][handler] = wrapAsync(controllers[controller][handler]); }));
/* eslint-disable global-require,max-len */
module.exports = controllers;
