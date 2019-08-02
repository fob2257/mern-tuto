const gravatar = require('gravatar');
const User = require('../../models/User');

const { generateSalt, hashPassword, camelCaseWord } = require('../../services/util.service');

exports.getUserData = (req, res) => {
  console.log(req.query);

  res.json('ayyylmao');
};

exports.registerUser = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
