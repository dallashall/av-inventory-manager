'use strict';
module.exports = function(sequelize, DataTypes) {
  var EventAssignment = sequelize.define('EventAssignment', {
    event_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return EventAssignment;
};