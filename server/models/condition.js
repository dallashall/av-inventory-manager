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
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Condition.associate = (models) => {
    Condition.hasMany(models.Item, {
      foreignKey: 'condition_id',
      as: 'items',
    });
    Condition.belongsTo(models.Company, {
      foreignKey: 'company_id',
      as: 'company',
    });
  };
  return Condition;
};
