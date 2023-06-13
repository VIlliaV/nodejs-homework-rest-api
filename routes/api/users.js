const express = require('express');

const { addUser } = require('../../controllers/users-controller');
const validateBody = require('../../decorators/validateBody');
const { usersAddSchema } = require('../../schemas/users');
const router = express.Router();

router.post('/register', validateBody(usersAddSchema), addUser);

module.exports = router;
