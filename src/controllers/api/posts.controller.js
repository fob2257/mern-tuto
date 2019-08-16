const { Post } = require('../../models/all-models');

exports.getPosts = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 })
    .populate('user', ['firstName', 'lastName', 'avatar'])
    .populate('likes.user', ['firstName', 'lastName', 'avatar'])
    .populate('comments.user', ['firstName', 'lastName', 'avatar'])
    .exec();

  res.json(posts);
};

exports.createPost = async (req, res) => {
  const {
    body,
    user: {
      id,
      firstName,
      lastName,
      avatar,
    },
  } = req;

  const post = await new Post({
    ...body,
    user: id,
    firstName,
    lastName,
    avatar,
  }).save();

  res.status(201).json(post);
};

exports.getPost = async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id)
    .populate('user', ['firstName', 'lastName', 'avatar'])
    .populate('likes.user', ['firstName', 'lastName', 'avatar'])
    .populate('comments.user', ['firstName', 'lastName', 'avatar'])
    .exec();
  // .populate({
  //   path: 'comments.user',
  //   select: ['firstName', 'lastName', 'avatar'],
  //   options: { sort: { createdAt: -1 } },
  // })

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  res.json(post);
};

exports.deletePost = async (req, res) => {
  const { user: { id: user }, params: { id: _id } } = req;

  const result = await Post.findOneAndRemove({ _id, user }).exec();

  res.status(204).send();
};

exports.createLike = async (req, res) => {
  const {
    user: { id: user },
    params: { id: postId },
  } = req;

  const post = await Post.findById(postId)
    .populate('likes.user', ['id'])
    .exec();

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  if (post.likes.some(obj => obj.user.id === user)) {
    post.likes = post.likes.filter(obj => obj.user.id !== user);
  } else {
    post.likes.unshift({ user });
  }

  await post.save();

  res.json(post);
};

exports.createComment = async (req, res) => {
  const {
    body,
    params: { id: postId },
    user: {
      id,
      firstName,
      lastName,
      avatar,
    },
  } = req;

  const post = await Post.findById(postId).exec();

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  post.comments.unshift({
    ...body,
    id: undefined,
    user: id,
    firstName,
    lastName,
    avatar,
    createdAt: new Date(),
  });

  await post.save();

  res.status(201).json(post);
};

exports.deleteComment = async (req, res) => {
  const {
    user: { id: userId },
    params: { postId, commentId },
  } = req;

  const post = await Post.findOne({ _id: postId })
    .populate('user', ['id'])
    .populate('comments.user', ['id'])
    .exec();

  if (!post) {
    return res.status(404).json({ message: 'Profile not found' });
  }

  const canDeleteComment = post.user.id === userId || post.comments.some(obj => obj.user.id === userId && obj.id === commentId);

  if (!canDeleteComment) {
    return res.status(400).json({ message: 'Your user can\'t delete this comment' });
  }

  post.comments = post.comments.filter(com => com.id !== commentId);

  await post.save();

  res.json(post);
};
