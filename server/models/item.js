module.exports = function defineItem(sequelize, DataTypes) {
  const Item = sequelize.define('Item', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.TEXT,
    },
    unique_num: {
      type: DataTypes.INTEGER,
    },
    location_id: {
      type: DataTypes.INTEGER,
    },
    condition_id: {
      type: DataTypes.INTEGER,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Item.associate = (models) => {
    Item.belongsTo(models.User, {
      foreignKey: 'creator_id',
      as: 'user',
    });
    Item.belongsToMany(models.Event, {
      foreignKey: 'item_id',
      through: 'itemEvents',
      as: 'events',
    });
    Item.belongsTo(models.StorageLocation, {
      foreignKey: 'location_id',
      as: 'location',
    });
    Item.belongsTo(models.StorageLocation, {
      foreignKey: 'home_id',
      as: 'home',
    });
    Item.belongsTo(models.Condition, {
      foreignKey: 'condition_id',
      as: 'condition',
    });
    Item.belongsTo(models.Company, {
      foreignKey: 'company_id',
      as: 'company',
    });
  };
  return Item;
};
