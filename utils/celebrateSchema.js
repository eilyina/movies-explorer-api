const { Joi } = require('celebrate');
const { urlRegExp } = require('./constants');

const movieCreateSchema = {
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(200),
    director: Joi.string().required().min(2).max(200),
    duration: Joi.number().integer(),
    year: Joi.number().integer(),
    description: Joi.string().required().min(2).max(1000),
    image: Joi.string().required().pattern(urlRegExp),
    trailerLink: Joi.string().required().pattern(urlRegExp),
    thumbnail: Joi.string().required().pattern(urlRegExp),
    owner: Joi.string().hex().length(24),
    movieId: Joi.number(),
    nameRU: Joi.string().required().min(2).max(200),
    nameEN: Joi.string().required().min(2).max(200),
  }),
};

const idSchema = {
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
};

const userUpdateSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
};

const userRegistrationSchema = {
  body: Joi.object().keys({
    password: Joi.string().required(),
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
};

const userLoginSchema = {
  body: Joi.object().keys({
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
};

module.exports = {
  movieCreateSchema,
  idSchema,
  userUpdateSchema,
  userRegistrationSchema,
  userLoginSchema,
};
