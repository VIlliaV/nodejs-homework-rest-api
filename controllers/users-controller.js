const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { HttpError } = require('../helpers');

const { ctrlWrapper } = require('../decorators');

const { SECRET_KEY } = process.env;

const registerUserCtrl = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) throw HttpError(409);

  const hashPassword = await bcrypt.hash(password, 10);
  const newUsers = await User.create({ ...req.body, password: hashPassword });
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

module.exports = {
  registerUser: ctrlWrapper(registerUserCtrl),
  loginUser: ctrlWrapper(loginUserCtrl),
};
