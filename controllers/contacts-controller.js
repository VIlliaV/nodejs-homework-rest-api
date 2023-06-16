const Contact = require('../models/contact');
const { HttpError } = require('../helpers');
const { ctrlWrapper } = require('../decorators');

const listContactsCtrl = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, ...query } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find(
    { owner, ...query },
    '-createdAt -updatedAt',
    { skip, limit }
  );

  res.json(result);
};

const getContactByIdCtrl = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const result = await Contact.findOne({
    _id: contactId,
    owner: owner,
  });

  if (!result) throw HttpError(404);
  res.json(result);
};

const addContactCtrl = async (req, res) => {
  const { _id: owner } = req.user;

  const newContacts = await Contact.create({ ...req.body, owner });

  res.status(201).json(newContacts);
};

const removeContactCtrl = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const result = await Contact.findOneAndDelete({
    _id: contactId,
    owner: owner,
  });

  if (!result) throw HttpError(404);
  res.json({ message: 'contact deleted' });
};

const updateContactCtrl = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: owner },
    req.body,
    {
      new: true,
    }
  );

  if (!result) throw HttpError(404);
  res.json(result);
};

const updateStatusContactCtrl = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: owner },
    req.body,
    {
      new: true,
    }
  );
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
