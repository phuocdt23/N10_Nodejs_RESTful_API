const { Joi } = require('express-validation')

const userValidation = {
  body: Joi.object({
    email: Joi.string()
      .regex(/[a-zA-Z0-9]/)
      .required()
      .email(),
    userName: Joi.string()
      .regex(/[a-zA-Z0-9]/)
      .required(),
    password: Joi.string()
      .min(6)
      .required()
  })
}
const userUpdateValidation = {
  body: Joi.object({
    email: Joi.string()
      .regex(/[a-zA-Z0-9]/)
      .email(),
    userName: Joi.string()
      .regex(/[a-zA-Z0-9]/),
    password: Joi.string()
      .min(6)
  })
}

module.exports = { userValidation, userUpdateValidation };
