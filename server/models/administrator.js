'use strict';
module.exports = function(sequelize, DataTypes) {
  var Administrator = sequelize.define('Administrator', {
    user_id: DataTypes.INTEGER,
    company_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Administrator;
};