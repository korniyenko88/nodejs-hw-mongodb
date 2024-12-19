import * as contactServices from '../services/contacts.js';
import createError from 'http-errors';

export const getContactsController = async (req, res) => {
  const data = await contactServices.getAllContacts();

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { contactId } = req.params;

  const data = await contactServices.getContactById(contactId);

  if (!data) {
    throw createError(404, `Contact with id=${contactId} not found`);
    //   const error = new Error(`Contact with id=${contactId} not found`);
    //   error.status = 404;
    //   throw error;
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id=${contactId}!`,
    data,
  });
};

export const addContactController = async (req, res) => {
  const data = await contactServices.addContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const updateData = req.body;
  const result = await contactServices.updateContact(contactId, updateData);
  if (!result) {
    throw createError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.data,
  });
};


export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  console.log('Contact ID to delete:', contactId);
  console.log('Type of Contact ID:', typeof contactId);
  const data = await contactServices.deleteContact({ _id: contactId });
  if (!data) {
    throw createError(404, 'Contact not found');
  }
  res.status(204).send();
};