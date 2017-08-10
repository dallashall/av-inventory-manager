module.exports = function defineCompany(sequelize, DataTypes) {
  const Company = sequelize.define('Company', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    calendar_id: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    logo_url: {
      type: DataTypes.STRING,
    },
  });
  Company.associate = (models) => {
    Company.belongsTo(models.User, {
      foreignKey: 'creator_id',
    });
    Company.belongsToMany(models.User, {
      as: 'members',
      through: 'memberships',
      foreignKey: 'company_id',
    });
    Company.belongsToMany(models.User, {
      as: 'admins',
      through: 'administratings',
      foreignKey: 'company_id',
    });
    Company.belongsToMany(models.User, {
      as: 'inventoryManagers',
      through: 'inventoryManagements',
      foreignKey: 'company_id',
    });
    Company.belongsToMany(models.User, {
      as: 'scheduleManagers',
      through: 'scheduleManagements',
      foreignKey: 'company_id',
    });
    Company.hasMany(models.StorageLocation, {
      as: 'storageLocations',
      foreignKey: 'company_id',
    });
    Company.hasMany(models.Invitation, {
      foreignKey: 'company_id',
      as: 'invites',
    });
  };
  return Company;
};
