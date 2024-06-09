import { Request, Response } from 'express';
import Joi from 'joi';

const productSchema = Joi.object({
  url: Joi.string().uri().required(),
  favicon: Joi.string().uri().required(),
  page_title: Joi.string().required(),
  title: Joi.string().required(),
  price: Joi.number().required(),
  price_symbol: Joi.string().required(),
  overview: Joi.array().items(Joi.string()).required(),
  description: Joi.array().items(Joi.string()).required(),
  main_images: Joi.array().items(Joi.string().uri()).required(),
  thumbnail_images: Joi.array().items(Joi.string().uri()).required(),
});

const validateWithSchema = (req: Request): string | undefined => {
  const data = req.body;
  const { error } = productSchema.validate(data);

  if (error) {
    return error.details[0].message;
  }

}

export { validateWithSchema}