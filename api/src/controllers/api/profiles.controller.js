const { default: of } = require('await-of');
const { Profile } = require('../../models/all-models');

exports.getProfiles = async (req, res) => {
  const { user, query: { only } } = req;

  // eslint-disable-next-line no-nested-ternary
  const profiles = (user && only) ? await Profile.find({ user: user.id }).populate('user', ['firstName', 'lastName', 'avatar']).exec()
    : (user) ? await Profile.find({ user: { $ne: user.id } }).populate('user', ['firstName', 'lastName', 'avatar']).exec()
      : await Profile.find().populate('user', ['firstName', 'lastName', 'avatar']).exec();

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
  const { user: { id: user } } = req;
  let { body } = req;

  const profile = await Profile.findOne({ user }).exec();

  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }

  body = {
    ...body,
    current: body.current === true,
    to: (body.current) ? undefined : body.to,
  };

  profile.experience = (profile.experience === null) ? [] : profile.experience;

  if (body.current && profile.experience.length) {
    const recentExp = profile.experience.shift();

    recentExp.current = false;
    recentExp.to = new Date();

    profile.experience.unshift(recentExp);
  }

  profile.experience.unshift(body);

  await profile.save();

  res.status(201).json(profile);
};

exports.createEducation = async (req, res) => {
  const { user: { id: user } } = req;
  let { body } = req;

  const profile = await Profile.findOne({ user }).exec();

  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }

  body = {
    ...body,
    current: body.current === true,
    to: (body.current) ? undefined : body.to,
  };

  profile.education = (profile.education === null) ? [] : profile.education;

  if (body.current && profile.education.length) {
    const recentEdu = profile.education.shift();

    recentEdu.current = false;
    recentEdu.to = new Date();

    profile.education.unshift(recentEdu);
  }

  profile.education.unshift(body);

  await profile.save();

  res.status(201).json(profile);
};

exports.deleteExperience = async (req, res) => {
  const { user: { id: user }, params: { id: expId } } = req;

  const profile = await Profile.findOne({ user }).populate('user', ['firstName', 'lastName', 'avatar']).exec();

  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }

  profile.experience = profile.experience.filter(exp => exp.id !== expId);

  await profile.save();

  res.json(profile);
};

exports.deleteEducation = async (req, res) => {
  const { user: { id: user }, params: { id: eduId } } = req;

  const profile = await Profile.findOne({ user }).populate('user', ['firstName', 'lastName', 'avatar']).exec();

  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }

  profile.education = profile.education.filter(edu => edu.id !== eduId);

  await profile.save();

  res.json(profile);
};

exports.getProfile = async (req, res) => {
  const { id } = req.params;

  const profile = await Profile.findById(id).populate('user', ['firstName', 'lastName', 'avatar']).exec();

  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }

  res.json(profile);
};

exports.getProfileByHandle = async (req, res) => {
  const { handle } = req.params;

  const profile = await Profile.findOne({ handle }).populate('user', ['firstName', 'lastName', 'avatar']).exec();

  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }

  res.json(profile);
};

exports.updateProfile = async (req, res) => {
  const { user: { id: user }, body, params: { id: _id } } = req;

  const profileData = {
    ...body,
    user,
    id: undefined,
    experience: undefined,
    education: undefined,
  };

  const profileExists = (await Profile.count({ _id, user }).exec()) > 0;

  if (!profileExists) {
    return res.status(404).json({ message: 'Profile not found' });
  }

  const profile = await Profile.findOneAndUpdate({ _id, user }, { $set: profileData }, { new: true }).exec();

  res.json(profile);
};

exports.deleteProfile = async (req, res) => {
  const { user: { id: user }, params: { id: _id } } = req;

  await Profile.findOneAndRemove({ _id, user }).exec();

  res.status(204).send();
};
