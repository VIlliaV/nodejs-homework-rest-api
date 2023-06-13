const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { HttpError } = require('../helpers');

const { ctrlWrapper } = require('../decorators');

const addUserCtrl = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log('🚀 ~ user:', user);

  if (user) throw HttpError(409, 'Email in use');

  const hashPassword = await bcrypt.hash(password, 10);
  const newUsers = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json(newUsers);
};

module.exports = {
  addUser: ctrlWrapper(addUserCtrl),
};
