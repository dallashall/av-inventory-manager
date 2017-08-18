const usersController = require('./users');
const companiesController = require('./company');
const itemsController = require('./item');
const locationController = require('./storage_location');
const eventController = require('./event');
const conditionController = require('./condition');

module.exports = {
  usersController,
  companiesController,
  itemsController,
  locationController,
  eventController,
  conditionController,
};
