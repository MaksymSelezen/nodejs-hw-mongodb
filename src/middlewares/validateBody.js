import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });

    next();
  } catch (err) {
    const validationError = createHttpError(400, 'Validation Error');

    validationError.errors = err.details.map((detail) =>
      detail.message.replace(/"/g, ''),
    );

    next(validationError);
  }
};
