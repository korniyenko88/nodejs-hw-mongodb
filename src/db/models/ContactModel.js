import { Schema, model } from 'mongoose';
import { typeList } from '../../constants/contacts.js';
import { hendelSaveError, setUpdateSettings } from './hooks.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: typeList,
      required: true,
      default: 'personal',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

contactSchema.post('save', hendelSaveError);
contactSchema.pre('findeOneAndUpdate', setUpdateSettings);

contactSchema.post('findOneAndUpdate', hendelSaveError);

const ContactsCollection = model('Contact', contactSchema);

export const sortByList = [
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
];
export default ContactsCollection;
