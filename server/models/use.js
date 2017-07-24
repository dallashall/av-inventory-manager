module.exports = function defineUse(sequelize, DataTypes) {
  const Use = sequelize.define('Use', {
    checkout_person_id: DataTypes.INTEGER,
    checkin_person_id: DataTypes.INTEGER,
  })
  Use.associate = (models) => {
    Use.belongsTo(models.User, {
      foreignKey: 'checkout_person_id',
      as: 'checkoutPerson',
    });
    Use.belongsTo(models.User, {
      foreignKey: 'checkin_person_id',
      as: 'checkinPerson',
    });
  };
  return Use;
};
