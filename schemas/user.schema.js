const baseJoi = require('joi')
const dateExtension = require('@joi/date'); //Esto lo puse para poder formatear la fecha de nacimiento en Dia/Mes/Año

const Joi = baseJoi.extend(dateExtension);

const userSchema = Joi.object({
    nickname: Joi.min(3).max(16).required().message({
        "string.empty": "El nombre es obligatorio",
        "string.min": "El nombre debe tener al menos 3 caracteres",
        "string.max":"El nombre debe ser menor a 16 caracteres",
        "any.required": "El nickName es obligatorio"
    }),

    lastName: Joi.string().min(3).max(16).required().message({
        "string.base": "El apellido debe ser texto",
        "string.empty": "El apellido es obligatorio",
        "string.min": "El apellido debe tener al menos 3 caracteres",
        "any.required": "El apellido es obligatorio"
    }),

    firstname: Joi.string().min(3).max(16).required.message({
        "string.base": "El nombre debe ser texto",
        "string.empty": "El nombre es obligatorio",
        "string.min": "El nombre debe tener al menos 3 caracteres",
        "any.required": "El nombre es obligatorio"
    }),

    birthdate : Joi.date().format('DD/MM/YYYY').greater('1/1/1900').max('now').required().message({
      'date.format': 'La fecha debe tener el formato Día/Mes/Año (ej: 25/12/1995)',
      'date.base': 'El formato de la fecha de nacimiento no es válido',
      'date.greater': 'La fecha de nacimiento debe ser posterior al 1 de enero de 1900',
      'date.max': 'La fecha de nacimiento no puede ser una fecha futura',
      'any.required': 'La fecha de nacimiento es un campo obligatorio'

    }),

    email: Joi.string().email({minDomainSegments:2/*Hace que tenga que haber 2 cosas despues del @ por ej gmail.com hotmail.ar*/}).
    trim()
    .required()
    .message({
      'string.base': 'El correo electrónico debe ser un texto',
      'string.email': 'El formato del correo electrónico no es válido',
      'string.empty': 'El correo electrónico no puede estar vacío',
      'any.required': 'El correo electrónico es un campo obligatorio'
    })



})

module.exports = userSchema;