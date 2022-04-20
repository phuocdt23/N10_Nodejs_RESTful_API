const { Joi } = require('express-validation')
const registerValidation = {
    body: Joi.object({
      userName: Joi.string()
        .regex(/[a-zA-Z0-9]/)
        .max(40)
        .required(),
      password: Joi.string()
        .min(6)
        .required()
    })
  }
module.exports = {registerValidation};