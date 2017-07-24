const Item = require('../models/index').Item;

const errorCB = res => error => res.status(400).send(error);
const successCB = res => payload => res.status(201).send(payload);

module.exports = {
  create(req, res) {
    const formItem = req.body.item;
    return Item.create(formItem)
      .then(successCB(res))
      .catch(errorCB(res));
  },
  read(req, res) {
    return Item.findById(req.params.id)
      .then(successCB(res))
      .catch(errorCB(res));
  },
  update(req, res) {
    const formItem = req.body.item;
    return Item.findById(req.params.id)
      .then(
        oldItem => oldItem.update(formItem, {
          fields: ['name', 'desc', 'condition_id'],
        })
          .then(successCB(res))
          .catch(errorCB(res))
      )
      .catch(errorCB(res));
  },
  destroy(req, res) {
    return Item.findById(req.params.id)
      .then(item => {
        item.destroy();
        return successCB(res)(item);
      })
      .catch(errorCB(res));
  },
};
