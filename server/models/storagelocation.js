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
  };
  return StorageLocation;
};
