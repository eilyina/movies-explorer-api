const router = require('express').Router();
const { celebrate } = require('celebrate');
const { userUpdateSchema } = require('../utils/celebrateSchema');

const {
  getUserInfo,
  updateUser,
} = require('../controllers/users');

router.get('/me', getUserInfo);
router.post(
  '/me',
  celebrate(userUpdateSchema),
  updateUser,
);

module.exports = router;
