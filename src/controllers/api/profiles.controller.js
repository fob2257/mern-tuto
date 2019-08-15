const { default: of } = require('await-of');
const { Profile } = require('../../models/all-models');

exports.getProfiles = async (req, res) => {
  const profiles = await Profile.find().populate('user', ['firstName', 'lastName', 'avatar']).exec();

  res.json(profiles);
};

exports.createProfile = async (req, res) => {
  const { body } = req;

  const profileData = { ...body, user: req.user.id, id: undefined };

  const profileExists = (await Profile.count({ user: profileData.user }).exec()) > 0;

  const profile = (profileExists) ? await Profile.findOneAndUpdate({ user: profileData.user }, { $set: profileData }, { new: true }).exec()
    : await new Profile(profileData).save();

  res.status(201).json(profile);
};

exports.createExperience = async (req, res) => {
  const { user: { id: user }, body } = req;

  const profile = await Profile.findOne({ user }).exec();

  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }

  profile.experience.unshift(body);

  await profile.save();

  res.status(201).json(profile);
};

exports.createEducation = async (req, res) => {
  const { user: { id: user }, body } = req;

  const profile = await Profile.findOne({ user }).exec();

  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }

  profile.education.unshift(body);

  await profile.save();

  res.status(201).json(profile);
};

exports.deleteExperience = async (req, res) => {
  const { user: { id: user }, params: { id: expId } } = req;

  const profile = await Profile.findOne({ user }).exec();

  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }

  profile.experience = profile.experience.filter(exp => exp.id !== expId);

  await profile.save();

  res.json(profile);
};

exports.deleteEducation = async (req, res) => {
  const { user: { id: user }, params: { id: eduId } } = req;

  const profile = await Profile.findOne({ user }).exec();

  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }

  profile.education = profile.education.filter(edu => edu.id !== eduId);

  await profile.save();

  res.json(profile);
};

exports.getProfile = async (req, res) => {
  const { id } = req.params;

  const [profile, err] = await of(Profile.findById(id).populate('user', ['firstName', 'lastName', 'avatar']).exec());

  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }

  res.json(profile);
};

exports.getProfileByHandle = async (req, res) => {
  const { handle } = req.params;

  const [profile, err] = await of(Profile.findOne({ handle }).populate('user', ['firstName', 'lastName', 'avatar']).exec());

  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }

  res.json(profile);
};

exports.deleteProfile = async (req, res) => {
  const { user: { id: user }, params: { id: _id } } = req;

  await Profile.findOneAndRemove({ _id, user }).exec();

  res.status(204).send();
};
