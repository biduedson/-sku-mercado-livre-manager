import Joi, { AnySchema, ObjectSchema } from "joi";

interface iCreateCategoriesrSchema {
  name: AnySchema;
}

export const createCategoriesSchema: ObjectSchema<iCreateCategoriesrSchema> =
  Joi.object({
    name: Joi.string().required().trim().messages({
      "string.base": "O campo name só aceita string.",
      "any.required": "O campo name é obrigatório.",
      "string.empty": "O campo name não pode ser vazio."
    })
  });
