module.exports = function defineStorageLocation(sequelize, DataTypes) {
  const StorageLocation = sequelize.define('StorageLocation', {
    short_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    long_description: {
      type: DataTypes.TEXT,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  StorageLocation.associate = (models) => {
    StorageLocation.belongsTo(models.Company, {
      as: 'company',
      foreignKey: 'company_id',
    });
    StorageLocation.hasMany(models.Item, {
      as: 'items',
      foreignKey: 'location_id',
    });
    StorageLocation.hasMany(models.Item, {
      as: 'home_items',
      foreignKey: 'home_id',
    });
  };
  return StorageLocation;
};
