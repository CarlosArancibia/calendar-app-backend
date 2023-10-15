const { Router } = require('express');
const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const route = Router();

route.post(
  '/new',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is invalid').isEmail(),
    check('password', 'Password must be more than 5 characters').isLength({ min: 5 }),
    validateFields,
  ],
  createUser
);

route.post(
  '/',
  [
    check('email', 'Email is invalid').isEmail(),
    check('password', 'Password must be more than 5 characters').isLength({ min: 5 }),
    validateFields,
  ],
  loginUser
);

route.get('/renew', validateJWT, revalidateToken);

module.exports = route;
