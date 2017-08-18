const { Condition } = require('../models/index');
const { successCB, errorCB } = require('./util.js');

const findSingleCondition = id => Condition.findById(id);
const userHasPermission = function userHasPermission(req) {
  return req.user.adminCompanies[req.body.condition.company_id];
};

const create = function create(req, res) {
  if (!userHasPermission(req)) {
    return errorCB(res)({ message: 'Insufficient permissions.' });
  }
  const formCondition = req.body.condition;
  return Condition.create(formCondition)
    .then(successCB(res))
    .catch(errorCB(res));
};

const read = function read(req, res) {
  return findSingleCondition(req.params.id)
    .then(successCB(res))
    .catch(errorCB(res));
};

const update = function update(req, res) {
  if (!userHasPermission(req)) {
    return errorCB(res)({ message: 'Insufficient permissions.' });
  }
  const formCondition = req.body.condition;
  return findSingleCondition(req.params.id)
    .then(oldCondition => oldCondition.update(formCondition)
      .then(successCB(res))
      .catch(errorCB(res))
    )
    .catch(errorCB(res));
};

const destroy = function destroy(req, res) {
  if (!userHasPermission(req)) {
    return errorCB(res)({ message: 'Insufficient permissions.' });
  }
  return findSingleCondition(req.params.id)
    .then((condition) => {
      condition.destroy();
      return successCB(res)(condition);
    })
    .catch(errorCB(res));
};

const index = function index(req, res) {
  console.log(req.query)
  return Condition.findAll({
    where: {
      company_id: req.query.company_id,
    },
  })
  .then(successCB(res))
  .catch(errorCB(res));
};

module.exports = {
  create,
  read,
  update,
  destroy,
  index,
};
