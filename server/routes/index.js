const usersController = require('../controllers').usersController;
const jwt = require('express-jwt');

module.exports = (app) => {
  app.use(jwt({ secret: process.env.JWT_SECRET }).unless({ path: ['/api/signInWithGoogle', '/api/oauth2callback'] }));
  app.get('/api', (req, res) => res.status(200).send({
    message: 'API at 100%.',
  }));

  app.post('/api/users', usersController.create);
  app.get('/api/signInWithGoogle', usersController.signupWithGoogle);
  app.get('/api/oauth2callback', usersController.receiveAuthToken);
};
