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
