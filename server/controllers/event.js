const google = require('googleapis');
const { User, Company, Event } = require('../models/index');
const { errorCB, successCB } = require('./util');

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);
const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

const userHasPermission = function checkPermissions(req) {
  return req.user.adminCompanies[req.body.company_id];
};

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

const createEvent = function createEvent(req, res) {
  const formEvent = req.body.event;
  if (!userHasPermission(req)) {
    return errorCB(res, 403)({ message: 'Not authorized to create events for this company' });
  }
  return Company.findById(req.body.company_id)
    .then((company) => {
      console.log(company);
      formEvent.calendarId = company.calendar_id;
      const calendarAccessCallback = () => (
        calendar.events.insert(formEvent, (err, event) => {
          if (err) { return errorCB(res)(err); }
          const appEvent = {
            calendar_id: company.calendar_id,
            event_id: event.id,
          };
          return Event.create(appEvent)
            .then(successCB(res))
            .catch(errorCB(res));
        })
      );
      return authAccessCalendar(req, calendarAccessCallback);
    })
    .catch(errorCB(res));
};

module.exports = {
  listCalendars,
  createEvent,
};
