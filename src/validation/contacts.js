import Joi from 'joi';
import { typeList } from '../constants/contacts.js';

export const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().optional(),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string()
    .valid(...typeList)
    .default('personal')
    .required(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string()
    .valid(...typeList)
    .default('personal'),
});

export const idSchema = Joi.object({
  contactId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
});
