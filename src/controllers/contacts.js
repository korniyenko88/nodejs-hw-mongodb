import createError from 'http-errors';
import { sortByList } from '../db/models/ContactModel.js';
import * as contactServices from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';


export const getContactsController = async (req, res) => {
 
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
  const filter = { userId: req.user._id };

  

  const data = await contactServices.getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter
  });
  console.log(page);
  console.log(perPage);
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { contactId: _id } = req.params;
  

  const data = await contactServices.getContactById({ _id, userId });

  if (!data) {
    throw createError(404, `Contact with id=${_id} not found`);
    //   const error = new Error(`Contact with id=${contactId} not found`);
    //   error.status = 404;
    //   throw error;
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id=${_id}!`,
    data,
  });
};

export const addContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const data = await contactServices.addContact({...req.body, userId});
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const updateContactController = async (req, res) => {
 const { _id: userId } = req.user;
 const { contactId: _id } = req.params;
  const updateData = req.body;
  const result = await contactServices.updateContact(
    { _id, userId },
    updateData,
  );
  if (!result) {
    throw createError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
};

export const deleteContactController = async (req, res) => {
   const { _id: userId } = req.user;
   const { contactId: _id } = req.params;
  
  console.log('user ID to delete:', userId);
  console.log('Contact ID to delete:', _id);
  console.log('Type of Contact ID:', typeof contactId);
  const data = await contactServices.deleteContact({ _id, userId });
  
  if (!data) {
    throw createError(404, 'Contact not found');
  }
  res.status(204).send();
};
