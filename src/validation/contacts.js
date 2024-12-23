import Joi from "joi";
import { typeList } from "../constants/contacts";

export const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  email: Joi.string(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...typeList).required(),
});