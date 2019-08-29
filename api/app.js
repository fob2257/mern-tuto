const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const compression = require('compression');

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({
  extended: true,
  limit: '20mb',
}));

// const db = mongoose.connect(require('./src/models/connection-string'), { useNewUrlParser: true });
// app.use(async (req, res, next) => {
//   req.db = (await db).models;
//   next();
// });

app.use('/api', require('./src/routes/api'));

/* eslint-disable no-unused-vars */
app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.status || 500).json(error);
});
/* eslint-enable no-unused-vars */

/**
 * Static files
 */
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('static/build'));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'static', 'build', 'index.html')));
}

/**
 * Logger
 */
app.use(morgan('common'));

module.exports = { app };
