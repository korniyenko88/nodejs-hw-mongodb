import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import * as contactsController from '../controllers/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(contactsController.getContactsController));

contactsRouter.get(
  '/:contactId',
  ctrlWrapper(contactsController.getContactsByIdController)
);

contactsRouter.post('/', ctrlWrapper(contactsController.addContactController));

export default contactsRouter;
