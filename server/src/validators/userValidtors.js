const Joi = require("joi");

const validateUserCreation = (userData) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    roleId: Joi.string().required()
  }).strict();
  const { error } = schema.validate(userData);
  if (error) 
    throw new Error(error.details[0].message); 
}

const validateUserUpdate = (userData) => {
    const schema = Joi.object({
      username: Joi.string().min(3).max(30).optional(),
      email: Joi.string().email().optional(),
      password: Joi.string().min(6).optional(),
      roleId: Joi.string().optional()
    }).strict();
    const { error } = schema.validate(userData);
    if (error) 
      throw new Error(error.details[0].message); 
}


module.exports = {
    validateUserCreation,
    validateUserUpdate
};
