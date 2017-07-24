const jwt = require('jsonwebtoken');
const { User, Company } = require('../models/index');
const google = require('googleapis');

// TODO: Move to util file and require...
const errorCB = res => error => res.status(400).send(error);
const successCB = res => payload => res.status(201).send(payload);

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
    include: { model: Company, as: 'adminCompanies' },
  })
    .spread((user, created) => {
      const token = jwt.sign({
        user_id: user.id,
        adminCompanies: user.adminCompanies.map(co => co.id),
      }, process.env.JWT_SECRET);
      console.log("token", token);
      res.status(200).send({
        token,
        user: {
          id: user.id,
          displayName: `${user.first_name} ${user.last_name}`,
          profile_img_url: user.profile_image_url,
        },
      });
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
  edit(req, res) {
    const userId = req.user.user_id;
    const userData = req.body.user;
    console.log("userData", userData);
    console.log("userId", userId);
    User.findById(userId)
      .then(
        oldUser => oldUser.update(userData, { fields: ['phone'] })
          .then(successCB(res))
          .catch(errorCB(res)))
      .catch(errorCB(res));
  },
};
