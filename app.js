const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const compression = require('compression');
const mongoose = require('mongoose');

const db = mongoose.connect(require('./src/models/connection-string'), { useNewUrlParser: true });

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({
  extended: true,
  limit: '20mb',
}));

app.use(async (req, res, next) => {
  req.db = (await db).models;
  next();
});

app.use('/api', require('./src/routes/api'));

/**
 * Logger
 */
app.use(morgan('common'));

module.exports = { app };
