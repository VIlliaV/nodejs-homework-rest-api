const Contact = require('../models/contact');

const { HttpError } = require('../helpers');

const { ctrlWrapper } = require('../decorators');

const listContactsCtrl = async (req, res) => {
  const result = await Contact.find({}, '-createdAt -updatedAt');

  res.json(result);
};

const getContactByIdCtrl = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findById(contactId);

  if (!result) throw HttpError(404);
  res.json(result);
};

const addContactCtrl = async (req, res) => {
  const newContacts = await Contact.create(req.body);

  res.status(201).json(newContacts);
};

const removeContactCtrl = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) throw HttpError(404);
  res.json({ message: 'contact deleted' });
};

const updateContactCtrl = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) throw HttpError(404);
  res.json(result);
};

const updateStatusContactCtrl = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
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
