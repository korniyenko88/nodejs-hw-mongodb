import { Router } from 'express';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  contactAddSchema,
  contactUpdateSchema,
  idSchema,
} from '../validation/contacts.js';

import * as contactsController from '../controllers/contacts.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(contactsController.getContactsController));

contactsRouter.get(
  '/:contactId',
  isValidId(idSchema),
  ctrlWrapper(contactsController.getContactsByIdController),
);

contactsRouter.post(
  '/',
  validateBody(contactAddSchema),
  ctrlWrapper(contactsController.addContactController),
);

contactsRouter.patch(
  '/:contactId',
  isValidId(idSchema),
  validateBody(contactUpdateSchema),
  ctrlWrapper(contactsController.updateContactController),
);

contactsRouter.delete(
  '/:contactId',
  isValidId(idSchema),
  ctrlWrapper(contactsController.deleteContactController),
);

export default contactsRouter;
