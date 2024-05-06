const Joi = require('joi');
const { validateRequest } = require('./validationMiddleware');

    const createUserSchema = Joi.object({
      "fullName": Joi.string().required(),
      "email": Joi.string().required(),
      "password": Joi.string().required(),
    });

    const loginUserSchema = Joi.object({
      "email": Joi.string().email().required(), 
      "password": Joi.string().required()
    });

const validateCreateUser = validateRequest(createUserSchema);
const validateLoginUser = validateRequest(loginUserSchema);

module.exports = {
  validateCreateUser,
  validateLoginUser
};
