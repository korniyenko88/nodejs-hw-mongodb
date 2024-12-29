import createError from 'http-errors';

export const isValidId = (idSchema) => {
  const func = async (req, res, next) => {
    try {
      await idSchema.validateAsync(
        { contactId: req.params.contactId },
        {
          abortEarly: false,
        },
      );
      next();
    } catch (error) {
      next(createError(400, error.message));
    }
  };

  return func;
};