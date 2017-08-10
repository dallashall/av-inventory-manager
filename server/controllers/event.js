const google = require('googleapis');
const { User, Company } = require('../models/index');

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);
const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

const authAccessCalendar = function authAccessCalendar(req, calendarAccessCallback) {
  User.findById(req.user.user_id).then((user) => {
    oauth2Client.setCredentials({
      refresh_token: user.refresh_token,
      access_token: user.access_token,
    });
    calendarAccessCallback();
  });
};

const listCalendars = function listCalendars(req, res) {
  const calendarAccessCallback = () => (
    calendar.calendarList.list({ minAccessRole: "owner" }, (err, list) => res.send(list.items))
  );
  authAccessCalendar(req, calendarAccessCallback);
};

module.exports = {
  listCalendars,
};
