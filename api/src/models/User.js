const mongoose = require('mongoose');
/* eslint-disable global-require */
if (mongoose.connection.readyState === 0) {
  mongoose.connect(require('./connection-string'), { useNewUrlParser: true });
}
/* eslint-enable global-require */
const { Schema } = mongoose;

const newSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: null },
  salt: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

newSchema.pre('save', function cb(next) {
  this.updatedAt = Date.now();
  next();
});

newSchema.pre('update', function cb() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

newSchema.pre('findOneAndUpdate', function cb() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

module.exports = mongoose.model('User', newSchema);
