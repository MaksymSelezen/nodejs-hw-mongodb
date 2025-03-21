import { SORT_ORDER } from '../constants/index.js';
import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

//

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = 'name',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsFilter = ContactsCollection.find();

  if (filter.type) {
    contactsFilter.where('contactType').equals(filter.type);
  }
  if (filter.isFavourite !== undefined) {
    contactsFilter.where('isFavourite').equals(filter.isFavourite);
  }

  contactsFilter.where('userId').equals(userId);

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsFilter).countDocuments(),
    contactsFilter
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, page, perPage);

  return {
    data: contacts,
    ...paginationData,
  };
};

//

export const getContactById = async (contactId, userId) => {
  return await ContactsCollection.findOne({ _id: contactId, userId });
};

//

export const createContact = async (payload) => {
  return await ContactsCollection.create(payload);
};

//

export const updateContact = async (contactId, payload, userId) => {
  return await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    { new: true },
  );
};

//

export const deleteContact = async (contactId, userId) => {
  return await ContactsCollection.findOneAndDelete({ _id: contactId, userId });
};
