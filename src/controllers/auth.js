import * as authSevices from '../services/auth.js';

export const registerController = async (req, res) => {
  const data = await authSevices.registr(req.body);

    res.status(201).json({
      staus: 201,
      message: 'Successfully registered user',
    });
};
