'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Conditions', [
      {
        name: 'Good Working',
        symbol: 'light',
        color: 'green',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Rough Working',
        symbol: 'light',
        color: 'yellow',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bad Working',
        symbol: 'light',
        color: 'orange',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'In Need of Repair',
        symbol: 'light',
        color: 'dark-orange',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Broken, Not Fixing',
        symbol: 'light',
        color: 'red',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
