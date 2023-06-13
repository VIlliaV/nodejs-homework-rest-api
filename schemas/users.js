const Joi = require('joi');

const usersAddSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua', 'uk'] },
    })
    .required()
    .messages({
      'any.required': `missing required 'email' field`,
      'string.empty': `'email' cannot be an empty field`,
    }),
  password: Joi.string().min(2).required().messages({
    'any.required': `missing required 'name' field`,
    'string.empty': `'name' cannot be an empty field`,
  }),
});

module.exports = { usersAddSchema };
