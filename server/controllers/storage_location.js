const { StorageLocation } = require('../models/index');
const { errorCB, successCB } = require('./util.js');

const locationById = function locationById(id) {
  return StorageLocation.findById(id);
};

const userHasPermission = function checkPermissions(req) {
  console.log(req.body.location.company_id);
  console.log(req.user.adminCompanies);
  return req.user.adminCompanies[req.body.location.company_id];
};

module.exports = {
  create(req, res) {
    if (!userHasPermission(req)) {
      return errorCB(res)({ message: 'You do not have permission to modify this company.' });
    }
    const formLocation = req.body.location;
    return StorageLocation.create(formLocation)
      .then(successCB(res))
      .catch(errorCB(res));
  },
  update(req, res) {
    if (!userHasPermission(req)) {
      return errorCB(res)({ message: 'You do not have permission to modify this company.' });
    }
    const formLocation = req.body.location;
    return locationById(req.params.id)
      .then(oldLocation => oldLocation.update(formLocation)
        .then(successCB(res))
        .catch(errorCB(res))
      );
  },
  read(req, res) {
    return locationById(req.params.id)
      .then(successCB(res))
      .catch(errorCB(res));
  },
  readAll(req, res){
    return StorageLocation.findAll({
      where: {
        company_id: req.query.company_id,
      },
    })
    .then(successCB(res))
    .catch(errorCB(res));
  },
  destroy(req, res) {
    if (!userHasPermission(req)) {
      return errorCB(res)({ message: 'You do not have permission to modify this company.' });
    }
    return locationById(req.params.id)
      .then((location) => {
        location.destroy();
        return successCB(res)(location);
      })
      .catch(errorCB(res));
  }
};
