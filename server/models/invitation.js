module.exports = function defineInvitation(sequelize, DataTypes) {
  const Invitation = sequelize.define('Invitation', {
    user_id: DataTypes.INTEGER,
    company_id: DataTypes.INTEGER,
    token: DataTypes.STRING,
    status: DataTypes.STRING,
    email: DataTypes.STRING,
  });
  Invitation.associate = (models) => {
    Invitation.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'inviter',
    });
    Invitation.belongsTo(models.Company, {
      foreignKey: 'company_id',
      as: 'company',
    });
  };
  return Invitation;
};
