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

const userIsCompanyMember = function userIsCompanyMember(req) {
  return req.user.companies[req.body.company_id];
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
      formEvent.calendarId = company.calendar_id;
      const calendarAccessCallback = () => (
        calendar.events.insert(formEvent, (err, event) => {
          if (err) { return errorCB(res)(err); }
          const appEvent = {
            calendar_id: company.calendar_id,
            event_id: event.id,
          };
          return Event.create(appEvent)
            .then(() => successCB(res)(event))
            .catch(errorCB(res));
        })
      );
      return authAccessCalendar(req, calendarAccessCallback);
    })
    .catch(errorCB(res));
};

const removeEvent = function removeEvent(req, res) {
  const formEvent = req.body.event;
  if (!userHasPermission(req)) {
    return errorCB(res, 403)({ message: 'Not authorized to create events for this company' });
  }
  return Company.findById(req.body.company_id)
    .then((company) => {
      formEvent.calendarId = company.calendar_id;
      const calendarAccessCallback = () => (
        calendar.events.delete(formEvent, (err, event) => {
          if (err) { return errorCB(res)(err); }
          const appEvent = {
            calendar_id: company.calendar_id,
            event_id: formEvent.eventId,
          };
          return Event.findOne({ where: appEvent })
            .then(() => successCB(res)(appEvent))
            .catch(errorCB(res));
        })
      );
      return authAccessCalendar(req, calendarAccessCallback);
    })
    .catch(errorCB(res));
};

const updateEvent = function updateEvent(req, res) {
  const formEvent = req.body.event;
  if (!userHasPermission(req)) {
    return errorCB(res, 403)({ message: 'Not authorized to create events for this company' });
  }
  return Company.findById(req.body.company_id)
    .then((company) => {
      formEvent.calendarId = company.calendar_id;
      const calendarAccessCallback = () => (
        calendar.events.patch(formEvent, (err, event) => {
          if (err) { return errorCB(res)(err); }
          return successCB(res)(event);
        })
      );
      return authAccessCalendar(req, calendarAccessCallback);
    })
    .catch(errorCB(res));
};

const volunteer = add => (req, res) => {
  if (!userIsCompanyMember(req)) {
    return errorCB(res, 403)({ message: 'Not a member of this company' });
  }
  const formEvent = { event_id: req.body.event_id };
  return Company.findById(req.body.company_id)
    .then((company) => {
      formEvent.calendar_id = company.calendar_id;
      const eventLookupInfo = {
        where: formEvent,
        include: [
          {
            model: User,
            as: 'volunteers',
            attributes: ['id', 'phone', 'first_name', 'email'],
          },
        ],
      };
      return Event.findOne(eventLookupInfo)
      .then((event) => {
        if (event) {
          if (add) {
            return event.addVolunteer(req.user.user_id)
              .then(() => Event.findOne(eventLookupInfo)
                .then(successCB(res))
                .catch(errorCB(res)))
              .catch(errorCB(res));
          } else {
            return event.removeVolunteer(req.user.user_id)
              .then(() => Event.findOne(eventLookupInfo)
                .then(successCB(res))
                .catch(errorCB(res)))
              .catch(errorCB(res));
          }
        }
        return errorCB(res, 404)({ message: "Event not found" });
      })
      .catch((err) => { console.log(err); return errorCB(res)(err); })
    })
    .catch(errorCB(res));
};

const assign = add => (req, res) => {
  if (!userHasPermission(req)) {
    return errorCB(res, 403)({ message: 'Not authorized to assign users to this company' });
  }
  const formEvent = { event_id: req.body.event_id };
  return Company.findById(req.body.company_id)
    .then((company) => {
      formEvent.calendar_id = company.calendar_id;
      const eventLookupInfo = {
        where: formEvent,
        include: [
          {
            model: User,
            as: 'volunteers',
            attributes: ['id', 'phone', 'first_name', 'email'],
          },
          {
            model: User,
            as: 'assignedUsers',
            attributes: ['id', 'phone', 'first_name', 'email'],
          },
        ],
      };
      return Event.findOne(eventLookupInfo)
      .then((event) => {
        if (event) {
          if (add) {
            return event.addAssignedUser(req.body.user_id)
              .then(() => Event.findOne(eventLookupInfo)
                .then(successCB(res))
                .catch(errorCB(res)))
              .catch(errorCB(res));
          } else {
            return event.removeAssignedUser(req.body.user_id)
              .then(() => Event.findOne(eventLookupInfo)
                .then(successCB(res))
                .catch(errorCB(res)))
              .catch(errorCB(res));
          }
        }
        return errorCB(res, 404)({ message: "Event not found" });
      })
      .catch((err) => { console.log(err); return errorCB(res)(err); })
    })
    .catch(errorCB(res));
};

const pullEvents = function pullEvents(req, res) {
  const params = {
    singleEvents: true,
    timeMax: new Date(Date.now() + (1000 * 60 * 60 * 24 * req.body.days)).toISOString(),
    timeMin: new Date().toISOString(),
  };
  if (!userHasPermission(req)) {
    return errorCB(res, 403)({ message: 'Not authorized to pull events for this company' });
  }
  return Company.findById(req.body.company_id)
  .then((company) => {
    params.calendarId = company.calendar_id;
    const calendarAccessCallback = () => (
      calendar.events.list(params, (err, events) => {
        if (err) { console.log(err); return errorCB(res)(err); }
        const pulledEvents = events.items.map(event => (
          {
            calendar_id: params.calendarId,
            event_id: event.id,
          }));
        console.log(pulledEvents);
        return Promise.all(
          pulledEvents.map((event) => {
            new Promise(() => Event.upsert(event));
          })
        )
          .then(() => successCB(res)({ message: "Success!" }))
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
  updateEvent,
  removeEvent,
  pullEvents,
  volunteer,
  assign,
};
