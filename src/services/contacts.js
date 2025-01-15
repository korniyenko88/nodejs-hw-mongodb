import ContactsCollection from '../db/models/ContactModel.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
}) => {
  const limit = perPage;
  const skip = (page - 1) * limit;
  const data = await ContactsCollection.find()
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder });
  
  const total = await ContactsCollection.countDocuments();
  const totalItems = await ContactsCollection.countDocuments();
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

export const addContact = (payload) => ContactsCollection.create(payload);

export const updateContact = async (_id, payload) => {
  const result = await ContactsCollection.findOneAndUpdate({ _id }, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const deleteContact = (filter) =>
  ContactsCollection.findOneAndDelete(filter);
