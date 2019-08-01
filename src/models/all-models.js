const fs = require('fs');

// require all the models
const models = {};
const names = fs.readdirSync('./models');

names.forEach((name) => {
  if (!name.match(/\.js$/)) return;
  if (name === 'connection-string.js' || name === 'all-models.js') return;
  /* eslint-disable global-require,import/no-dynamic-require */
  const model = require(`./${name}`);
  /* eslint-enable global-require,import/no-dynamic-require */
  models[model.modelName] = model;
});

// define non-enumerable method to place each model onto an object. primarily for making them global
Object.defineProperty(Object.getPrototypeOf(models), 'toContext', {
  enumerable: false,
  value: (context) => {
    // for (let name in this) {
    //   context[name] = this[name];
    // }
    /* eslint-disable no-param-reassign */
    Object.keys(this).forEach((name) => { context[name] = this[name]; });
    /* eslint-enable no-param-reassign */
    return context;
  },
});


module.exports = models;
