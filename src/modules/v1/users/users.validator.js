import Joi from 'joi';

const fields = {
  firstName: Joi.string()
    .trim()
    .min(1)
    .max(30)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .messages({
      'string.empty': 'El nombre es requerido',
      'string.min': 'El nombre debe tener al menos 1 carácter',
      'string.max': 'El nombre no puede exceder 30 caracteres',
      'string.pattern.base': 'El nombre solo puede contener letras y espacios'
    }),

  lastName: Joi.string()
    .trim()
    .min(1)
    .max(30)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .messages({
      'string.empty': 'El apellido es requerido',
      'string.min': 'El apellido debe tener al menos 1 carácter',
      'string.max': 'El apellido no puede exceder 30 caracteres',
      'string.pattern.base': 'El apellido solo puede contener letras y espacios'
    }),

  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .messages({
      'string.empty': 'El correo electrónico es requerido',
      'string.email': 'Debe ser un correo electrónico válido'
    }),

  password: Joi.string()
    .min(6)
    .max(30)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .messages({
      'string.empty': 'La contraseña es requerida',
      'string.min': 'La contraseña debe tener al menos 6 caracteres',
      'string.max': 'La contraseña no puede exceder 30 caracteres',
      'string.pattern.base': 'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
    }),

  passwordLogin: Joi.string()
    .required()
    .messages({
      'string.empty': 'La contraseña es requerida'
    })
};

const userSchema = {
  register: Joi.object({
    firstName: fields.firstName.required(),
    lastName: fields.lastName.required(),
    email: fields.email.required(),
    password: fields.password.required()
  }),

  login: Joi.object({
    email: fields.email.required(),
    password: fields.passwordLogin
  })
};

export default userSchema;