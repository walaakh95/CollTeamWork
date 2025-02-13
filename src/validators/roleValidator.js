const Joi = require("joi");

const validateRoleCreation = (userData) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
  }).strict();
  const { error } = schema.validate(userData);
  if (error) 
    throw new Error(error.details[0].message); 
}

const validateRoleUpdate = (userData) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
    }).strict();
    const { error } = schema.validate(userData);
    if (error) 
      throw new Error(error.details[0].message); 
}


module.exports = {
    validateRoleCreation,
    validateRoleUpdate
};
