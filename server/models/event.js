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
    summary: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    start_time: {
      type: DataTypes.DATE,
    },
    end_time: {
      type: DataTypes.DATE,
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
      through: 'itemEvents',
      foreignKey: 'event_id',
    });
  };
  return Event;
};
