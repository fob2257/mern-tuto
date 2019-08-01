// place connection string here
// e.g. const uri = 'mongodb://andy:corn@ds051334.mongolab.com:51334/cli';
// or   const uri = 'mongodb://andy:corn@localhost:27017/cli';
// or   const uri = config.get('mongo');
// or   const uri = process.env.MONGO_URL

const url = require('url');

const { mongoURI } = require('../../config/keys.json');

const uri = mongoURI;
if (!uri) {
  throw new Error(`You need to provide the connection string.
  You can open "models/connection-string.js" and export it or use the "setUri" command.`);
}

const uriObj = url.parse(uri);
if (uriObj.protocol !== 'mongodb:') {
  throw new Error('Must be a mongodb URI');
}
if (!uriObj.host || !uriObj.path) {
  throw new Error('Improperly formatted URI');
}

module.exports = uri;
