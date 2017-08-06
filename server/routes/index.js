const {
  usersController,
  companiesController,
  itemsController,
  locationController,
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
  app.post('/api/companies/:id/addInventoryManager', companiesController.addInventoryManager);
  app.get('/api/addViaEmail', companiesController.addViaEmail);

  app.post('/api/items', itemsController.create);
  app.get('/api/items/:id', itemsController.read);
  app.patch('/api/items/:id', itemsController.update);
  app.delete('/api/items/:id', itemsController.destroy);

  app.post('/api/locations', locationController.create);
  app.get('/api/locations/:id', locationController.read);
  app.get('/api/locations', locationController.readAll);
  app.patch('/api/locations/:id', locationController.update);
  app.delete('/api/locations/:id', locationController.destroy);
};
