import ContactsCollection from '../db/models/ContactModel.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * limit;

  const query = ContactsCollection.find(filter);

  const data = await query
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder });
  
  
  const total = await ContactsCollection.countDocuments(filter);
  const totalItems = await ContactsCollection.countDocuments(filter);
  const paginationData = calcPaginationData({ total, page, perPage });

  return {
    data,
    page,
    perPage,
    totalItems,
    ...paginationData,
  };
};

export const getContactById = (id) => ContactsCollection.findById(id);

export const getContact = (filter) => ContactsCollection.findOne(filter);

export const addContact = (payload) => ContactsCollection.create(payload);

export const updateContact = async (filter, payload) => {
  const result = await ContactsCollection.findOneAndUpdate(filter, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const deleteContact = (filter) =>
  ContactsCollection.findOneAndDelete(filter);
