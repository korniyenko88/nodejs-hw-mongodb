import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { authLoginSchema, authRegisterSchema } from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import * as authController from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  '/registr',
  validateBody(authRegisterSchema),
  ctrlWrapper(authController.registerController)
);

authRouter.post(
  '/login',
  validateBody(authLoginSchema),
  ctrlWrapper(authController.loginController),
);

authRouter.post('/refresh', ctrlWrapper(authController.refreshController));

export default authRouter;
