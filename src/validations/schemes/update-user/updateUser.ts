import Joi, { AnySchema, ObjectSchema } from "joi";

interface IUpdateUserSchema {
  username: AnySchema;
  email: AnySchema;
}

export const updateUserSchema: ObjectSchema<IUpdateUserSchema> = Joi.object({
  username: Joi.string().required().trim().messages({
    "string.base": "O campo username só aceita string",
    "any.required": "O campo username é obrigatório"
  }),
  email: Joi.string().email().required().trim().messages({
    "string.base": "O campo email só aceita string",
    "any.required": "O campo email é obrigatório",
    "string.email": "O campo e-mail não esta em um formato valido."
  })
});
