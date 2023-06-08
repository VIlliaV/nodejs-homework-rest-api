
const Movie = require('../models/contact');

const { HttpError } = require('../helpers');

const { ctrlWrapper } = require('../decorators');

const listContactsCtrl = async (req, res) => {

  const result = await Movie.find({}, '-createdAt -updatedAt');

  res.json(result);
};

const getContactByIdCtrl = async (req, res) => {
  const { contactId } = req.params;

  const result = await Movie.findById(contactId);

  if (!result) throw HttpError(404);
  res.json(result);
};

const addContactCtrl = async (req, res) => {

  const newContacts = await Movie.create(req.body);

  res.status(201).json(newContacts);
};

const removeContactCtrl = async (req, res) => {
  const { contactId } = req.params;

  const result = await Movie.findByIdAndDelete(contactId);

  if (!result) throw HttpError(404);
  res.json({ message: 'contact deleted' });
};

const updateContactCtrl = async (req, res) => {
  const { contactId } = req.params;

  const result = await Movie.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) throw HttpError(404);
  res.json(result);
};

const updateStatusContactCtrl = async (req, res) => {
  const { contactId } = req.params;
  const result = await Movie.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) throw HttpError(404);
  res.json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContactsCtrl),
  getContactById: ctrlWrapper(getContactByIdCtrl),
  addContact: ctrlWrapper(addContactCtrl),
  updateContact: ctrlWrapper(updateContactCtrl),
  removeContact: ctrlWrapper(removeContactCtrl),

  updateStatusContact: ctrlWrapper(updateStatusContactCtrl),

};
