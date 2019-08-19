const mongoose = require('mongoose');
/* eslint-disable global-require */
if (mongoose.connection.readyState === 0) {
  mongoose.connect(require('./connection-string'), { useNewUrlParser: true });
}
/* eslint-enable global-require */
const { Schema } = mongoose;

const newSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  text: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  avatar: { type: String, default: null },
  likes: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  }],
  comments: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    avatar: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
  }],
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

module.exports = mongoose.model('Post', newSchema);
