import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { authRegisterSchema } from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import * as authController from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  '/registr',
  validateBody(authRegisterSchema),
  ctrlWrapper(authController.registerController)
);

export default authRouter;
