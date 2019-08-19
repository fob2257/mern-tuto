const mongoose = require('mongoose');
/* eslint-disable global-require */
if (mongoose.connection.readyState === 0) {
  mongoose.connect(require('./connection-string'), { useNewUrlParser: true });
}
/* eslint-enable global-require */
const { Schema } = mongoose;

const newSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  handle: { type: String, required: true, max: 40 },
  company: { type: String },
  website: { type: String },
  location: { type: String },
  status: { type: String, required: true },
  skills: { type: [String], required: true },
  bio: { type: String },
  githubUsername: { type: String },
  experience: [{
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    from: { type: Date, required: true },
    to: { type: Date },
    current: { type: Boolean, default: false },
    description: { type: String },
  }],
  education: [{
    school: { type: String, required: true },
    degree: { type: String, required: true },
    fieldOfStudy: { type: String, required: true },
    from: { type: Date, required: true },
    to: { type: Date },
    current: { type: Boolean, default: false },
    description: { type: String },
  }],
  social: {
    youtube: { type: String },
    twitter: { type: String },
    facebook: { type: String },
    linkedin: { type: String },
  },
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

module.exports = mongoose.model('Profile', newSchema);
