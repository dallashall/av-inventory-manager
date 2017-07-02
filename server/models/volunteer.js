'use strict';
module.exports = function(sequelize, DataTypes) {
  var Volunteer = sequelize.define('Volunteer', {
    user_id: DataTypes.INTEGER,
    event_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Volunteer;
};