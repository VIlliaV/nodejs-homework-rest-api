const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');
const User = require('../models/user');
const { HttpError } = require('../helpers');
const { ctrlWrapper } = require('../decorators');
const { SECRET_KEY } = process.env;

const avatarDir = path.resolve('public', 'avatars');

const registerUserCtrl = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) throw HttpError(409);
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUsers = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    user: { email: newUsers.email, subscription: newUsers.subscription },
  });
};

const loginUserCtrl = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw HttpError(401);
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw HttpError(401);
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: { email, subscription: user.subscription },
  });
};

const logoutUserCtrl = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: '' });

  res.status(204).json();
};

const currentUserCtrl = async (req, res) => {
  const { email, subscription, avatarURL } = req.user;

  res.json({ email, subscription, avatarURL });
};

const updateSubscriptionCtrl = async (req, res) => {
  const { _id, email } = req.user;

  const { subscription } = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  res.json({ email, subscription });
};

const updateAvatarCtrl = async (req, res) => {
  const { _id } = req.user;
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarDir, filename);

  await Jimp.read(oldPath)
    .then(avatar => {
      return avatar.resize(250, 250).write(oldPath);
    })
    .catch(err => {
      console.error(err);
    });

  await fs.rename(oldPath, newPath);
  const avatarURL = path.join('avatars', filename);
  await User.findByIdAndUpdate(_id, { ...req.body, avatarURL });
  res.json({ avatarURL });
};

module.exports = {
  registerUser: ctrlWrapper(registerUserCtrl),
  loginUser: ctrlWrapper(loginUserCtrl),
  logoutUser: ctrlWrapper(logoutUserCtrl),
  currentUser: ctrlWrapper(currentUserCtrl),
  updateSubscription: ctrlWrapper(updateSubscriptionCtrl),
  updateAvatar: ctrlWrapper(updateAvatarCtrl),
};
