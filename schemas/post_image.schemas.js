const Joi = require("joi");

const postImageSchema = Joi.object({
  imageUrl: Joi.string().uri().required().messages({
    "string.base": "La URL de la imagen debe ser texto",
    "string.empty": "La URL de la imagen no puede estar vacía",
    "string.uri": "La URL de la imagen debe ser una URL válida",
  }),
  postId: Joi.number().integer().min(1).required().messages({
    "number.base": "El ID del post debe ser un número",
    "number.integer": "El ID del post debe ser un número entero",
    "number.min": "El ID del post no puede ser menor que 1",
  }),
});

module.exports = {postImageSchema};
