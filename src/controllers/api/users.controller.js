const gravatar = require('gravatar');
const User = require('../../models/User');

const {
  generateSalt,
  hashPassword,
  camelCaseWord,
  comparePassword,
} = require('../../services/util.services');

const { generateJWT } = require('../../services/jwt.services');

exports.getUserData = (req, res) => {
  console.log(req.query);

  res.json('ayyylmao');
};

exports.registerUser = async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    password,
  } = req.body;

  const emailUsed = await User.count({ email }).exec();

  if (emailUsed > 0) {
    return res.status(400).json({ message: 'This email is already beign used' });
  }

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

  // Or

  // const newUser = new User({
  //   firstName: camelCaseWord(firstName),
  //   lastName: camelCaseWord(lastName),
  //   email,
  //   password: await hashPassword(password, salt),
  //   avatar: gravatar.url(email, {
  //     s: '200',
  //     r: 'pg',
  //     d: 'mm',
  //     protocol: 'http',
  //   }),
  //   salt,
  // });

  // await newUser.save();

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
    return res.status(400).json({ message: 'Password did not match' });
  }

  const tokenTTL = 1000 * 60 * 60 * 2;
  const token = await generateJWT({
    id: user.id,
    name: user.firstName,
    lastname: user.lastName,
    email,
  }, tokenTTL);

  res.status(200).json({ token });
};
