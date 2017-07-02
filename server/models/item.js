module.exports = function defineItem(sequelize, DataTypes) {
  const Item = sequelize.define('Item', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.TEXT,
    },
    unique_num: {
      type: DataTypes.INTEGER,
    },
    condition_id: {
      type: DataTypes.STRING,
    },
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate(models) {
        Item.belongsTo(models.User, {
          foreignKey: 'creator_id',
        });
        Item.belongsTo(models.Condition, {
          foreignKey: 'condition_id',
        });
      },
    },
  });
  return Item;
};
