const { Router } = require('express');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { isDate } = require('../helpers/is-date');
const { validateJWT } = require('../middlewares/validate-jwt');

const route = Router();

route.use(validateJWT);

route.get('/', getEvents);

route.post(
  '/',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Start date is invalid').custom(isDate),
    check('end', 'End date is invalid').custom(isDate),
    validateFields,
  ],
  createEvent
);

route.put(
  '/:id',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Start date is invalid').custom(isDate),
    check('end', 'End date is invalid').custom(isDate),
    validateFields,
  ],
  updateEvent
);

route.delete('/:id', [check('id', 'Invalid Id').isMongoId(), validateFields], deleteEvent);

module.exports = route;
