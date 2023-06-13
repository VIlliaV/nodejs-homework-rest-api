const User = require('../models/user');

const { HttpError } = require('../helpers');

const { ctrlWrapper } = require('../decorators');

const addUserCtrl = async (req, res) => {
  const newContacts = await Contact.create(req.body);

  res.status(201).json(newContacts);
};
