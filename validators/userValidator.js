const Joi = require("joi");
const userValidator = (body) => {
  const schema = Joi.object({
    user: Joi.string().min(4).max(128).required(),
    pwd: Joi.string().min(4).max(128).required(),
  });
  return schema.validate(body);
};
const registerValidator = (body) => {
  const schema = Joi.object({
    user: Joi.string().min(4).max(128).required(),
    pwd: Joi.string().min(4).max(128).required(),
    firstName: Joi.string().min(4).max(128).required(),
    lastName: Joi.string().min(4).max(128).required(),
    email: Joi.string().min(4).max(128).required(),
    phone: Joi.string().min(4).max(128).required(),
    adress: Joi.string().min(4).max(128).required(),
  });
  return schema.validate(body);
};
module.exports = { userValidator, registerValidator };
