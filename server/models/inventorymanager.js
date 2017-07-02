'use strict';
module.exports = function(sequelize, DataTypes) {
  var InventoryManager = sequelize.define('InventoryManager', {
    user_id: DataTypes.INTEGER,
    company_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return InventoryManager;
};