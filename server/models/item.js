'use strict';
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    desc: DataTypes.TEXT,
    unique_num: DataTypes.INTEGER,
    condition_id: DataTypes.INTEGER,
    creator_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Item;
};