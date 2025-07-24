import Joi from 'joi';

// Campos base reutilizables dentro del archivo
const fields = {
  title: Joi.string()
    .trim()
    .min(1)
    .max(255)
    .messages({
      'string.empty': 'El título es requerido',
      'string.min': 'El título debe tener al menos 1 carácter',
      'string.max': 'El título no puede exceder 255 caracteres'
    }),

  description: Joi.string()
    .trim()
    .max(1000)
    .allow('')
    .messages({
      'string.max': 'La descripción no puede exceder 1000 caracteres'
    }),

  status: Joi.string()
    .valid('pending', 'completed')
    .messages({
      'any.only': 'El estado debe ser "pending" o "completed"'
    }),

  taskId: Joi.number()
    .integer()
    .positive()
    .messages({
      'number.base': 'El ID de la tarea debe ser un número',
      'number.positive': 'El ID de la tarea debe ser positivo'
    })
};

const taskSchema = {
  create: Joi.object({
    title: fields.title.required(),
    description: fields.description.optional()
  }),

  update: Joi.object({
    title: fields.title.optional(),
    description: fields.description.optional(),
    status: fields.status.optional()
  }),

  params: Joi.object({
    taskId: fields.taskId.required()
  })
};

export default taskSchema;