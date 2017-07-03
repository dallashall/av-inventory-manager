const usersController = require('../controllers').usersController;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'API at 100%.',
  }));

  app.post('/api/users', usersController.create);
  app.get('/api/signInWithGoogle', usersController.signupWithGoogle);
  app.get('/api/oauth2callback', usersController.receiveAuthToken);
};
