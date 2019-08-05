const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const compression = require('compression');
const passport = require('passport');

const { passportJwtStrategy } = require('./src/middlewares');

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

app.use(passport.initialize());
passportJwtStrategy(passport);

app.use('/api', require('./src/routes/api'));

/* eslint-disable no-unused-vars */
app.use((error, req, res, next) => {
  console.log(error);
  if (error.isBoom) {
    return res.status(400).json(error.data.map(({ message }) => ({ message })));
  }
  res.status(error.status || 500).json(error);
});
/* eslint-enable no-unused-vars */

/**
 * Logger
 */
app.use(morgan('common'));

module.exports = { app };
