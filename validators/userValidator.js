const Joi = require("joi");
const userValidator = (body) => {
  const schema = Joi.object({
    user: Joi.string().min(4).max(128).required(),
    pwd: Joi.string().min(4).max(128).required(),
  });
  return schema.validate(body);
};
module.exports = { userValidator };
