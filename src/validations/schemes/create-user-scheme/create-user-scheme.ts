import Joi, { AnySchema, ObjectSchema } from "joi";

interface iCreateUserSchema {
  username: AnySchema;
  email: AnySchema;
  password: AnySchema;
}

export const createUserSchema = Joi.object({
  username: Joi.string().required().trim().messages({
    "string.base": "O campo username só aceita string",
    "any.required": "O campo username é obrigatório",
    "string.empty": "O campo username não pode ser vazio"
  }),
  email: Joi.string().email().required().trim().messages({
    "string.base": "O campo email só aceita string",
    "any.required": "O campo email é obrigatório",
    "string.empty": "O campo email não pode ser vazio",
    "string.email": "O campo e-mail não esta em um formato valido."
  }),
  password: Joi.string().required().trim().messages({
    "string.base": "O campo password só aceita string.",
    "any.required": "O campo password é obrigatório.",
    "string.empty": "O campo password não pode ser vazio."
  })
}) as ObjectSchema<iCreateUserSchema>;
