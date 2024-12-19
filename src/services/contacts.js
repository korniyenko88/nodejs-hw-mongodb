import ContactsCollection from '../db/models/ContactModel.js';

export const getAllContacts = () => ContactsCollection.find();

export const getContactById = (id) => ContactsCollection.findById(id);

export const addContact = (payload) => ContactsCollection.create(payload);

export const updateContact = async (_id, payload) => {
  const result = await ContactsCollection.findOneAndUpdate({ _id }, payload, {
    new: true,
  });

  return result;
};

export const deleteContact = (filter) =>
  ContactsCollection.findOneAndDelete(filter);
