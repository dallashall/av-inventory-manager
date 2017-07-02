module.exports = function defineUser(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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
    password_digest: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER,
    },
    profile_img_url: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate(models) {
        User.hasMany(models.Item, {
          foreignKey: 'creator_id',
          as: 'createdInventory',
        });
        User.hasMany(models.Company, {
          foreignKey: 'creator_id',
          as: 'createdCompanies',
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
      },
    },
  });
  return User;
};
