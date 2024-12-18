import ContactsCollection from '../db/models/ContactModel.js';

export const getAllContacts = () => ContactsCollection.find();

export const getContactById = (id) => ContactsCollection.findById(id);

export const addContact = (payload) => ContactsCollection.create(payload);