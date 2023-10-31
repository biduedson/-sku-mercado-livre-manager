import Joi, { AnySchema, ObjectSchema } from "joi";

interface iCreateProductsSchema {
  name: AnySchema;
  description: AnySchema;
  price: AnySchema;
  stock: AnySchema;
  sku: AnySchema;
  category_id: AnySchema;
}

export const iCreateProductsSchema: ObjectSchema<iCreateProductsSchema> =
  Joi.object({
    name: Joi.string().required().trim().messages({
      "string.base": "O campo name só aceita string.",
      "any.required": "O campo name é obrigatório.",
      "string.empty": "O campo name não pode ser vazio."
    }),
    description: Joi.string().required().trim().messages({
      "string.base": "O campo description só aceita string.",
      "any.required": "O campo description é obrigatório.",
      "string.empty": "O campo description não pode ser vazio."
    }),
    price: Joi.number().positive().integer().required().messages({
      "number.base": "O campo price só aceita numeros.",
      "any.required": "O campo price é obrigatório.",
      "number.empty": "O campo price não pode ser vazio.",
      "number.integer": "O campo price deve ser um numero inteiro.",
      "number.positive": "O campo price não pode conter numeros negativos."
    }),
    stock: Joi.number().positive().integer().required().messages({
      "number.base": "O campo stock só aceita numeros.",
      "any.required": "O campo stock é obrigatório.",
      "number.empty": "O campo stock não pode ser vazio.",
      "number.integer": "O campo stock deve ser um numero inteiro.",
      "number.positive": "O campo stock não pode conter numeros negativos."
    }),
    sku: Joi.string().required().trim().messages({
      "string.base": "O campo sku só aceita string.",
      "any.required": "O campo sku é obrigatório.",
      "string.empty": "O campo sku não pode ser vazio."
    }),
    category_id: Joi.number().positive().integer().required().messages({
      "number.base": "O campo stock só aceita numeros.",
      "any.required": "O campo stock é obrigatório.",
      "number.empty": "O campo stock não pode ser vazio.",
      "number.integer": "O campo stock deve ser um numero inteiro.",
      "number.positive": "O campo stock não pode conter numeros negativos."
    })
  });
