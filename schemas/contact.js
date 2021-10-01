const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().min(3).required(),
  phone: Joi.string().min(15).required(),
});

module.exports = contactSchema;
