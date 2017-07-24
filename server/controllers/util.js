const errorCB = (res, status = 400) => error => res.status(status).send(error);
const successCB = (res, status = 201) => payload => res.status(status).send(payload);

module.exports = { errorCB, successCB };
