import * as authServices from '../services/auth.js';

export const registerController = async (req, res) => {
  const data = await authServices.registr(req.body);
  const { password, ...newResData } = data.toObject();

  res.status(201).json({
    staus: 201,
    message: 'Successfully registered a user!',
    User: newResData,
  });
};

export const loginController = async (req, res) => {
  const session = await authServices.login(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session.id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.json({
    status: 200,
    message: 'Succesfully login user',
    data: {
      accessToken: session.accessToken,
    },
  });
};
