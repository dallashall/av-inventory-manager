module.exports = function defineItem(sequelize, DataTypes) {
  const Volunteering = sequelize.define('Volunteering', {
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Volunteering;
};
