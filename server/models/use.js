module.exports = function defineUse(sequelize, DataTypes) {
  const Use = sequelize.define('Use', {
    checkout_person_id: DataTypes.INTEGER,
    checkin_person_id: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate(models) {
        Use.belongsTo(models.User, {
          foreignKey: 'checkout_person_id',
          as: 'checkoutPerson',
        });
        Use.belongsTo(models.User, {
          foreignKey: 'checkinPerson',
          as: 'checkinPerson',
        });
      },
    },
  });
  return Use;
};
