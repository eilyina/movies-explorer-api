const mongoose = require('mongoose');
const Movie = require('../models/movie');
const ForbiddenError = require('../utils/ForbiddenError');
const NotFoundError = require('../utils/NotFoundError');
const BadRequestError = require('../utils/BadRequestError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})

    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail()
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Запрещено редактировать чужие фильмы');
      }
      return Movie.findByIdAndDelete(req.params.id);
    })
    .then(
      (movie) => res.send({ movie, message: 'Фильм успешно удален' }),
    )
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }

      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Данные не найдены'));
        return;
      }

      next(err);
    });
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};
