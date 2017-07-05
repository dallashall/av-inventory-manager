const jwt = require('jsonwebtoken');
const User = require('../models/index').User;
const google = require('googleapis');

const plus = google.plus('v1');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

const scopes = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/plus.login',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/calendar',
];

const googleUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
});

const findOrCreateUser = function findOrCreateUser(res, googleUser, refreshToken) {
  const newUser = {
    first_name: googleUser.name.givenName,
    last_name: googleUser.name.familyName,
    email: googleUser.emails[0].value,
    refresh_token: refreshToken,
    profile_img_url: googleUser.image.url,
  };

  User.findOrCreate({
    where: { email: googleUser.emails[0].value },
    defaults: newUser,
  })
    .spread((user, created) => {
      const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET);
      res.status(200).send(token);
    });
};

const retreiveGoogleUser = function retreiveGoogleUser(res, refreshToken) {
  plus.people.get({
    userId: 'me',
    auth: oauth2Client,
  }, (err, googleUser) => {
    console.log(googleUser);
    return findOrCreateUser(res, googleUser, refreshToken);
  });
};

module.exports = {
  create(req, res) {
    const formattedUser = Object.assign({}, reqUser, { password: 'password' }, { password_digest });
    return User.create(formattedUser)
      .then(user => res.status(201).send(user)) // Change this
      .catch(error => res.status(400).send(error));
  },
  signupWithGoogle(req, res) {
    res.redirect(googleUrl);
  },
  receiveAuthToken(req, res) {
    const authToken = req.query.code;
    console.log(authToken);
    oauth2Client.getToken(authToken, (err, tokens) => {
      if (!err) {
        console.log('Received access and refresh tokens.');
        oauth2Client.setCredentials(tokens);
        return retreiveGoogleUser(res, tokens.refresh_token);
      }
    });
  },
};
