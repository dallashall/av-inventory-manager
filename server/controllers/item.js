const { Item, Condition, Company, Event } = require('../models/index');

const errorCB = res => error => res.status(400).send(error);
const successCB = res => payload => res.status(201).send(payload);
const findSingleItem = id => Item.findById(id, {
  include: [
    {
      model: Condition,
      as: 'condition',
      attributes: ['name', 'symbol', 'color'],
    },
  ],
});


module.exports = {
  create(req, res) {
    const formItem = req.body.item;
    return Item.create(formItem)
      .then(item => findSingleItem(item.id).then(successCB(res)))
      .catch(errorCB(res));
  },
  read(req, res) {
    return findSingleItem(req.params.id)
      .then(successCB(res))
      .catch(errorCB(res));
  },
  update(req, res) {
    const formItem = req.body.item;
    return Item.findById(req.params.id)
      .then(
        oldItem => oldItem.update(formItem, {
          fields: ['name', 'desc', 'condition_id', 'location_id', 'home_id'],
        })
          .then(item => findSingleItem(item.id).then(successCB(res)))
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
  index(req, res) {
    const where = {};
    if (req.query.name) {
      where.name = { $iLike: req.query.name };
    }
    if (req.query.condition) {
      where.condition_id = { $in: req.query.condition };
    }
    console.log(where);
    return Company.findById(req.query.company_id, {
      include: [
        {
          model: Item,
          as: 'items',
          where
        },
      ],
    })
      .then((company) => {
        successCB(res)(company.items);
      })
      .catch(errorCB(res));
  },
  lastEvent(req, res) {
    return Event.findAll({
      where: {
        start_time: {
          $lte: Date.now(),
        },
      },
      order: [['start_time', 'DESC']],
      limit: 1,
      include: [{
        model: Item,
        as: 'items',
        where: {
          id: req.params.id,
        },
      }],
    })
    .then(successCB(res))
    .catch(err => {console.log(err); errorCB(res);});
  },
};
