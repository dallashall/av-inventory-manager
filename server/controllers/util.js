const errorCB = res => error => res.status(400).send(error);
const successCB = res => payload => res.status(201).send(payload);

module.exports = { errorCB, successCB };
