const express = require('express');

const {
  registerUser,
  loginUser,
} = require('../../controllers/users-controller');
const validateBody = require('../../decorators/validateBody');
const {
  usersRegisterSchema,
  usersLoginSchema,
} = require('../../schemas/users');
const router = express.Router();

router.post('/register', validateBody(usersRegisterSchema), registerUser);
router.post('/login', validateBody(usersLoginSchema), loginUser);

module.exports = router;
