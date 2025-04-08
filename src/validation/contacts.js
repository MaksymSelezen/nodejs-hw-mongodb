import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

//

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string()
    .pattern(/^\+380\d{9}$/)
    .required(),
  email: Joi.string().email(),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid('work', 'home', 'personal')
    .default('personal')
    .required(),
  userId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('User id should be a valid mongo id');
    }
    return true;
  }),
  photo: Joi.string(),
});

//

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().pattern(/^\+380\d{9}$/),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().min(3).max(20).valid('work', 'home', 'personal'),
  userId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('User Id should be a valid mongo Id');
    }
    return true;
  }),
  photo: Joi.string(),
});
