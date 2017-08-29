module.exports = function defineItem(sequelize, DataTypes) {
  const Assignments = sequelize.define('Assignments', {
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Assignments;
};
