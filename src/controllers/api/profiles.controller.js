const { Profile } = require('../../models/all-models');

exports.createProfile = async (req, res) => {
  const { body } = req;

  const profileData = { ...body, user: req.user.id, id: undefined };

  const profileExists = (await Profile.count({ user: profileData.user }).exec()) > 0;

  const profile = (profileExists) ? await Profile.findOneAndUpdate({ user: profileData.user }, { $set: profileData }, { new: true }).exec()
    : await new Profile(profileData).save();

  res.json(profile);
};
