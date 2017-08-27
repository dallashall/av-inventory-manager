const {
  usersController,
  companiesController,
  itemsController,
  locationController,
  eventController,
  conditionController,
} = require('../controllers');
const jwt = require('express-jwt');

module.exports = (app) => {
  app.use(jwt({ secret: process.env.JWT_SECRET }).unless({
    path: [
      '/api/signInWithGoogle',
      '/api/oauth2callback',
      '/api',
      '/addTeamMember',
    ],
  }));
  app.get('/api', (req, res) => res.status(200).send({
    message: 'API at 100%.',
  }));

  app.get('/addTeamMember', (req, res) => {
    res.redirect(`inventorycommander://inventorycommander/${req.query.token}`);
  });

  // app.post('/api/users', usersController.create);
  app.get('/api/signInWithGoogle', usersController.signupWithGoogle);
  app.get('/api/oauth2callback', usersController.receiveAuthToken);
  app.patch('/api/users', usersController.edit);
  app.get('/api/syncPermissions', usersController.syncPermissions);

  app.post('/api/companies', companiesController.create);
  app.patch('/api/companies/:id', companiesController.update);
  app.get('/api/companies/:id', companiesController.read);
  app.delete('/api/companies/:id', companiesController.destroy);
  app.post('/api/companies/:id/invite', companiesController.inviteViaEmail);
  app.post('/api/companies/:id/addMembers', companiesController.addMembers);
  app.post('/api/companies/:id/InventoryManager', companiesController.addInventoryManager);
  app.delete('/api/companies/:id/InventoryManager', companiesController.removeInventoryManager);
  app.post('/api/companies/:id/ScheduleManager', companiesController.addScheduleManager);
  app.delete('/api/companies/:id/ScheduleManager', companiesController.removeScheduleManager);
  app.get('/api/addViaEmail', companiesController.addViaEmail);

  app.post('/api/items', itemsController.create);
  app.get('/api/items', itemsController.index);
  app.get('/api/items/:id', itemsController.read);
  app.patch('/api/items/:id', itemsController.update);
  app.delete('/api/items/:id', itemsController.destroy);

  app.post('/api/conditions', conditionController.create);
  app.get('/api/conditions/:id', conditionController.read);
  app.get('/api/conditions', conditionController.index);
  app.patch('/api/conditions/:id', conditionController.update);
  app.delete('/api/conditions/:id', conditionController.destroy);

  app.post('/api/locations', locationController.create);
  app.get('/api/locations/:id', locationController.read);
  app.get('/api/locations', locationController.readAll);
  app.patch('/api/locations/:id', locationController.update);
  app.delete('/api/locations/:id', locationController.destroy);

  app.get('/api/calendars', eventController.listCalendars);
  app.post('/api/calendars', eventController.createEvent);
  app.patch('/api/calendars', eventController.updateEvent);
  app.delete('/api/calendars', eventController.removeEvent);
  app.post('/api/calendars/pull', eventController.pullEvents);
  app.post('/api/calendars/volunteer', eventController.volunteer(true));
  app.delete('/api/calendars/volunteer', eventController.volunteer(false));
  app.post('/api/calendars/assign', eventController.assign(true));
  app.delete('/api/calendars/assign', eventController.assign(false));
  app.post('/api/calendars/inventory', eventController.inventory(true));
  app.delete('/api/calendars/inventory', eventController.inventory(false));
  app.get('/api/calendars/availableInventory', eventController.availableInventory);
  app.get('/api/calendars/myEvents', eventController.assignedEvents);
  app.get('/api/calendars/event', eventController.assignedEvents);
  app.get('/api/calendars/events', eventController.companyEvents);
};
