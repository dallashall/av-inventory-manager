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
    description: {
      type: DataTypes.TEXT,
    },
    logo_url: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate(models) {
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
          through: 'inventoryManagemehts',
          foreignKey: 'company_id',
        });
        Company.belongsToMany(models.User, {
          as: 'scheduleManagers',
          through: 'scheduleyManagemehts',
          foreignKey: 'company_id',
        });
        Company.hasMany(models.StorageLocation, {
          as: 'storageLocations',
          foreignKey: 'company_id',
        });
      },
    },
  });
  return Company;
};
