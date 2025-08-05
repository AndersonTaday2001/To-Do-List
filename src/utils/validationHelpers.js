export const formatValidationErrors = (joiError) => {
  return joiError.details.map(detail => ({
    field: detail.path.join('.'),
    message: detail.message,
    value: detail.context?.value
  }));
};