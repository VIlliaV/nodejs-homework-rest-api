const express = require('express');

const {
  listContacts,
  getContactById,
  // removeContact,
  // addContact,
  // updateContact,
} = require('../../controllers/contacts-controller');

// const validateBody = require('../../decorators/validateBody');
// const { contactsAddSchema } = require('../../schemas/contacts');
// const { isBodyEmpty } = require('../../helpers');
const { isValidId } = require('../../middlewares');
const router = express.Router();

router.get('/', listContacts);

router.get('/:contactId', isValidId, getContactById);

// router.post('/', validateBody(contactsAddSchema), addContact);

// router.delete('/:contactId', removeContact);

// router.put(
//   '/:contactId',
//   isBodyEmpty,
//   validateBody(contactsAddSchema),
//   updateContact
// );

module.exports = router;
