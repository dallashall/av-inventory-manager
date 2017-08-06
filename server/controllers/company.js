const { Company, User, Invitation } = require('../models/index');
const jwt = require('jsonwebtoken');
const { errorCB, successCB } = require('./util.js');
const mailgun = require('mailgun.js');

const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });

const userHasPermission = function checkPermissions(req) {
  return req.user.adminCompanies[req.params.id];
};

const emailInviteToUser = function emailInviteToUser(req, res, invitation) {
  console.log('Inviting via email');
  Company.findById(req.user.company_id, {
    include: [{
      model: User,
      as: 'admins',
      attributes: ['id', 'phone', 'first_name', 'email'],
    }] })
    .then((company) => {
      console.log('Adding member to company');
      company.addMember(req.user.user_id);
      console.log('Updating invitation status');
      invitation.update({ status: 'Accepted' });
      return successCB(res)(company);
    })
    .catch(errorCB(res));
};

module.exports = {
  create(req, res) {
    const formCompany = req.body.company;
    console.log(req.user.user_id);
    return Company.create(formCompany)
      .then((company) => {
        console.log(company);
        company.addAdmin(req.user.user_id);
        return company;
      })
      .then(successCB(res))
      .catch(errorCB(res));
  },
  update(req, res) {
    const formCompany = req.body.company;
    if (!userHasPermission(req)) {
      return errorCB(res, 403)({ message: 'Not authorized to modify this company.' });
    }
    return Company.findById(req.params.id)
      .then(
        oldCompany => oldCompany.update(formCompany, { fields: ['name', 'description', 'logo_url'] })
          .then(successCB(res))
          .catch(errorCB(res))
      )
      .catch(errorCB(res));
  },
  destroy(req, res) {
    if (!userHasPermission(req)) {
      return errorCB(res, 403)({ message: 'Not authorized to delete this company.' });
    }
    return Company.findById(req.params.id)
      .then(
        (company) => {
          company.destroy();
          return successCB(res)(company);
        }
      )
      .catch(errorCB(res));
  },
  read(req, res) {
    if (!userHasPermission(req)) {
      return errorCB(res, 403)({ message: 'Not authorized to view this company. You may need to sync your permissions.' });
    }
    return Company.findById(req.params.id, {
      include: [
        {
          model: User,
          as: 'admins',
          attributes: ['id', 'phone', 'first_name', 'email'],
        },
        {
          model: Invitation,
          as: 'invites',
          attributes: ['id', 'email', 'status', 'createdAt', 'updatedAt'],
        }
      ] })
        .then(successCB(res))
        .catch(errorCB(res));
  },
  addAdmin(req, res) {
    if (!userHasPermission(req)) {
      return errorCB(res, 403)({ message: 'Not authorized to modify administrators.' });
    }
    return Company.findById(req.params.id, {
      include: [{
        model: User,
        as: 'admins',
        attributes: ['id', 'phone', 'first_name', 'email'],
      }] })
      .then((company) => {
        company.addAdmin(req.body.admin.id);
        return successCB(res)(company);
      })
      .catch(errorCB(res));
  },
  addMembers(req, res) {
    if (!userHasPermission(req)) {
      return errorCB(res, 403)({ message: 'Not authorized to modify administrators.' });
    }
    return Company.findById(req.params.id, {
      include: [{
        model: User,
        as: 'admins',
        attributes: ['id', 'phone', 'first_name', 'email'],
      }] })
      .then((company) => {
        company.addMembers(req.body.members);
        return successCB(res)(company);
      })
      .catch(errorCB(res));
  },
  addInventoryManager(req, res) {
    if (!userHasPermission(req)) {
      return errorCB(res, 403)({ message: 'Not authorized to add managers.' });
    }
    return Company.findById(req.params.id)
      .then((company) => {
        company.addInventoryManager(req.body.manager.id)
          .then(val => {
            Company.findById(req.params.id, {
              include: [{
                model: User,
                as: 'inventoryManagers',
                attributes: ['id', 'phone', 'first_name', 'email'],
              }] })
              .then(updatedCompany => successCB(res)(updatedCompany));
          });
      })
      .catch(errorCB(res));
  },
  removeInventoryManager(req, res) {
    if (!userHasPermission(req)) {
      return errorCB(res, 403)({ message: 'Not authorized to add managers.' });
    }
    return Company.findById(req.params.id)
      .then((company) => {
        company.removeInventoryManager(req.body.manager.id)
          .then(val => {
            Company.findById(req.params.id, {
              include: [{
                model: User,
                as: 'inventoryManagers',
                attributes: ['id', 'phone', 'first_name', 'email'],
              }] })
              .then(updatedCompany => successCB(res)(updatedCompany));
          });
      })
      .catch(errorCB(res));
  },
  addScheduleManager(req, res) {
    if (!userHasPermission(req)) {
      return errorCB(res, 403)({ message: 'Not authorized to add managers.' });
    }
    return Company.findById(req.params.id)
      .then((company) => {
        company.addScheduleManager(req.body.manager.id)
          .then(val => {
            Company.findById(req.params.id, {
              include: [{
                model: User,
                as: 'scheduleManagers',
                attributes: ['id', 'phone', 'first_name', 'email'],
              }] })
              .then(updatedCompany => successCB(res)(updatedCompany));
          });
      })
      .catch(errorCB(res));
  },
  removeScheduleManager(req, res) {
    if (!userHasPermission(req)) {
      return errorCB(res, 403)({ message: 'Not authorized to add managers.' });
    }
    return Company.findById(req.params.id)
      .then((company) => {
        company.removeScheduleManager(req.body.manager.id)
          .then(val => {
            Company.findById(req.params.id, {
              include: [{
                model: User,
                as: 'scheduleManagers',
                attributes: ['id', 'phone', 'first_name', 'email'],
              }] })
              .then(updatedCompany => successCB(res)(updatedCompany));
          });
      })
      .catch(errorCB(res));
  },
  inviteViaEmail(req, res) {
    if (!userHasPermission(req)) {
      return errorCB(res, 403)({ message: 'Not authorized to invite new members.' });
    }
    const token = jwt.sign({
      company_id: req.params.id,
      user_id: req.user.user_id,
    }, process.env.JWT_SECRET);

    return mg.messages.create('dallashall.tech', {
      from: 'dallas@dallashall.tech',
      to: [req.body.email],
      subject: 'Test Invite Email',
      html: `<h1>User: ${req.user.user_id} has invited you to join the team!</h1>
            <a href="http://192.168.128.43:8000/addTeamMember?token=${token}">Click to join the team.</a>`,
    })
    .then((emailSuccess) => {
      console.log(emailSuccess);
      Invitation.create({
        user_id: req.user.user_id,
        company_id: req.params.id,
        token,
        status: 'Pending',
        email: req.body.email,
      }).then(successCB(res));
    })
    .catch(errorCB(res));
  },
  addViaEmail(req, res) {
    console.log('Adding via email...');
    return Invitation.findOne({ where: { token: req.query.token } })
      .then((invitation) => {
        if (invitation.status !== 'Pending') {
          console.log('Already added invited user.');
          return errorCB(res)({ message: 'User already invited.' });
        }
        return emailInviteToUser(req, res, invitation);
      })
      .catch(errorCB(res));
  },
};
