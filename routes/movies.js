const router = require('express').Router();
const { celebrate } = require('celebrate');
const { movieCreateSchema, idSchema } = require('../utils/celebrateSchema');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', celebrate(movieCreateSchema), createMovie);
router.delete('/:id', celebrate(idSchema), deleteMovie);

module.exports = router;
