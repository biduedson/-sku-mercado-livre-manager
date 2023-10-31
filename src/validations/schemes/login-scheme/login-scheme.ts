import Joi, { AnySchema, ObjectSchema } from "joi";

interface iLoginSchema {
  name: AnySchema;
}

export const loginSchema: ObjectSchema<iLoginSchema> = Joi.object({
  email: Joi.string().email().required().trim().messages({
    "string.base": "O campo email só aceita string.",
    "any.required": "O campo email é obrigatório.",
    "string.empty": "O campo email não pode ser vazio.",
    "string.email": "O campo e-mail não esta em um formato valido."
  }),
  password: Joi.string().required().trim().messages({
    "any.required": "O campo senha é obrigatório.",
    "string.empty": "O campo senha não pode ser vázio."
  })
});
