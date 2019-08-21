const gravatar = require('gravatar');
const { default: of } = require('await-of');
const { User, Profile } = require('../../models/all-models');

// const { emailUsed } = require('../../middlewares');

const {
  generateSalt,
  hashPassword,
  camelCaseWord,
  comparePassword,
} = require('../../services/util.services');

const { generateJWT } = require('../../services/jwt.services');

exports.registerUser = async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    password,
  } = req.body;

  // if (await emailUsed(email)) {
  //   return res.status(400).json({ message: 'This email is already beign used' });
  // }

  const salt = await generateSalt();

  const newUser = await User.create({
    firstName: camelCaseWord(firstName),
    lastName: camelCaseWord(lastName),
    email,
    password: await hashPassword(password, salt),
    avatar: gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm',
      protocol: 'http',
    }),
    salt,
  });

  newUser.password = undefined;
  newUser.salt = undefined;

  res.json(newUser);
};

exports.logInUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).exec();

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (!await comparePassword(password, user.password)) {
    return res.status(400).json({ message: 'Password did not matched' });
  }

  const {
    id,
    firstName,
    lastName,
    avatar,
  } = user;

  const tokenTTL = 60 * 60 * 2;
  const token = await generateJWT({
    id,
    firstName,
    lastName,
    avatar,
    email,
  }, tokenTTL);

  res.status(200).json({ token });
};

exports.refreshToken = async (req, res) => {
  const { user } = req;

  user.password = undefined;
  user.salt = undefined;

  const tokenTTL = 60 * 60 * 2;
  const token = await generateJWT({ ...user }, tokenTTL);

  res.status(200).json({ token });
};

exports.myData = (req, res) => {
  const { user } = req;

  user.password = undefined;
  user.salt = undefined;

  res.json(user);
};

exports.getUserProfile = async (req, res) => {
  const { id: user } = req.params;

  const [profile, err] = await of(Profile.findOne({ user }).populate('user', ['firstName', 'lastName', 'avatar']).exec());

  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }

  res.json(profile);
};
