const express = require('express');

const {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  updateSubscription,
  updateAvatar,
} = require('../../controllers/users-controller');
const { authenticate, upload } = require('../../middlewares');
const { isBodyEmpty } = require('../../helpers');
const validateBody = require('../../decorators/validateBody');
const {
  usersRegisterSchema,
  usersLoginSchema,
  usersUpdateSubscriptionSchema,
} = require('../../schemas/users');
const router = express.Router();

router.post('/register', validateBody(usersRegisterSchema), registerUser);
router.post('/login', validateBody(usersLoginSchema), loginUser);
router.post('/logout', authenticate, logoutUser);
router.get('/current', authenticate, currentUser);
router.patch(
  '/subscription',
  authenticate,
  isBodyEmpty,
  validateBody(usersUpdateSubscriptionSchema),
  updateSubscription
);

router.patch('/avatars', authenticate, upload.single('avatar'), updateAvatar);

module.exports = router;
