const {
  usersController,
  companiesController,
  itemsController
} = require('../controllers');
const jwt = require('express-jwt');

module.exports = (app) => {
  // app.use(jwt({ secret: process.env.JWT_SECRET }).unless({
  //   path: [
  //     '/api/signInWithGoogle',
  //     '/api/oauth2callback',
  //     '/api/companies',
  //     '/api/companies/1',
  //   ],
  // }));
  app.get('/api', (req, res) => res.status(200).send({
    message: 'API at 100%.',
  }));

  app.post('/api/users', usersController.create);
  app.get('/api/signInWithGoogle', usersController.signupWithGoogle);
  app.get('/api/oauth2callback', usersController.receiveAuthToken);

  app.post('/api/companies', companiesController.create);
  app.patch('/api/companies/:id', companiesController.update);
  app.get('/api/companies/:id', companiesController.read);
  app.delete('/api/companies/:id', companiesController.destroy);

  app.post('/api/items', itemsController.create);
  app.get('/api/items/:id', itemsController.read);
  app.patch('/api/items/:id', itemsController.update);
  app.delete('/api/items/:id', itemsController.destroy);
};
