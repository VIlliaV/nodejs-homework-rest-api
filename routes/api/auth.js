const express = require('express');

const {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
} = require('../../controllers/users-controller');
const { authenticate } = require('../../middlewares');
const validateBody = require('../../decorators/validateBody');
const {
  usersRegisterSchema,
  usersLoginSchema,
} = require('../../schemas/users');
const router = express.Router();

router.post('/register', validateBody(usersRegisterSchema), registerUser);
router.post('/login', validateBody(usersLoginSchema), loginUser);
router.post('/logout', authenticate, logoutUser);
router.post('/current', authenticate, currentUser);

module.exports = router;
