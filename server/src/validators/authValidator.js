const Joi = require("joi");

const validateUserRgisteration = (userData) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }).strict();
  const { error } = schema.validate(userData);
  if (error) 
    throw new Error(error.details[0].message); 
}

const validateUserLogin = (userData) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }).strict();

  const { error } = schema.validate(userData);
  if (error) 
    throw new Error(error.details[0].message); 
}

module.exports = {
  validateUserRgisteration,
  validateUserLogin
};
