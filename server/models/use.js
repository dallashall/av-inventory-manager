'use strict';
module.exports = function(sequelize, DataTypes) {
  var Use = sequelize.define('Use', {
    inventory_id: DataTypes.INTEGER,
    event_id: DataTypes.INTEGER,
    checkout_person_id: DataTypes.INTEGER,
    checkin_person_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Use;
};