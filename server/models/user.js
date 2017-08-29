module.exports = function defineUser(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    access_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_img_url: {
      type: DataTypes.STRING,
    },
  })
  User.associate = (models) => {
    User.hasMany(models.Item, {
      foreignKey: 'creator_id',
      as: 'createdInventory',
    });
    User.hasMany(models.Company, {
      foreignKey: 'creator_id',
      as: 'createdCompanies',
    });
    User.hasMany(models.Invitation, {
      as: 'sentInvitations',
      foreignKey: 'user_id',
    });
    User.belongsToMany(models.Company, {
      as: 'companies',
      through: 'memberships',
      foreignKey: 'user_id',
    });
    User.belongsToMany(models.Company, {
      as: 'adminCompanies',
      through: 'administratings',
      foreignKey: 'user_id',
    });
    User.belongsToMany(models.Company, {
      as: 'managedCompanies',
      through: 'inventoryManagements',
      foreignKey: 'user_id',
    });
    User.belongsToMany(models.Company, {
      as: 'scheduleCompanies',
      through: 'scheduleManagements',
      foreignKey: 'user_id',
    });
    User.belongsToMany(models.Event, {
      as: 'potentialEvents',
      through: models.Volunteering,
      foreignKey: 'user_id',
    });
    User.belongsToMany(models.Event, {
      as: 'assignedEvents',
      through: models.Assignments,
      foreignKey: 'user_id',
    });
  };
  return User;
};
