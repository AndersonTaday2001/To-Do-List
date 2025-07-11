import Joi from 'joi';

const userSchema = Joi.object({
    firstName: Joi.string().trim().min(1).max(30).required(),
    lastName: Joi.string().trim().min(1).max(30).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(6).max(30).required(),
})

export default userSchema;