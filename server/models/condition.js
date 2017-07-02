module.exports = function defineCondition(sequelize, DataTypes) {
  const Condition = sequelize.define('Condition', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    symbol:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate(models) {
        Condition.hasMany(models.Item, {
          foreignKey: 'condition_id',
          as: 'items',
        });
      },
    },
  });
  return Condition;
};
