const Company = require('../models/index').Company;

module.exports = {
  create(req, res) {
    const formCompany = req.body.company;
    return Company.create(formCompany)
      .then(company => res.status(201).send(company))
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    const formCompany = req.body.company;
    return Company.findById(req.params.id)
      .then(
        oldCompany => oldCompany.update(formCompany, { fields: ['name', 'description', 'logo_url'] })
          .then(company => res.status(201).send(company))
          .catch(error => res.status(400).send(error)),
        error => res.status(400).send(error)
      );
  },
  destroy(req, res) {
    return Company.findById(req.params.id)
      .then(
        (company) => {
          company.destroy();
          return res.status(201).send(company);
        }
      )
      .catch(error => res.status(400).send(error));
  },
  read(req, res) {
    return Company.findById(req.params.id)
      .then(
        company => res.status(201).send(company),
        error => res.status(400).send(error)
      );
  },
};

// TODO: Dry up error callback
