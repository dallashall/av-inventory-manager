module.exports = function defineEvent(sequelize, DataTypes) {
  const Event = sequelize.define('Event', {
    calendar_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    event_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
    {
      indexes: [
        {
          unique: true,
          fields: ['calendar_id', 'event_id'],
        },
      ],
    }
  );
  Event.associate = (models) => {
    Event.belongsToMany(models.User, {
      as: 'volunteers',
      through: 'volunteering',
      foreignKey: 'event_id',
    });
    Event.belongsToMany(models.User, {
      as: 'assignedUsers',
      through: 'assignments',
      foreignKey: 'event_id',
    });
    Event.belongsToMany(models.Item, {
      as: 'items',
      through: models.Use,
      foreignKey: 'event_id',
    });
  };
  return Event;
};
