'use strict';
module.exports = function(sequelize, DataTypes) {
  var StorageLocation = sequelize.define('StorageLocation', {
    short_description: DataTypes.STRING,
    long_description: DataTypes.TEXT,
    company_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return StorageLocation;
};