const { Company, User } = require('../models/index');
const { errorCB, successCB } = require('./util.js');

const userHasPermission = function checkPermissions(req) {
  return req.user.adminCompanies[req.params.id];
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
      include: [{
        model: User,
        as: 'admins',
        attributes: ['id', 'phone', 'first_name', 'email'],
      }] })
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
      .then(company => {
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
      .then(company => {
        company.addMembers(req.body.members);
        return successCB(res)(company);
      })
      .catch(errorCB(res));
  },
};

// TODO: Add permissions
