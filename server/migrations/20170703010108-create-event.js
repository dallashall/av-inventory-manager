module.exports = {
  up(queryInterface, Sequelize) {
    queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      calendar_id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      event_id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      start_time: {
        type: Sequelize.DATE,
      },
      description: {
        type: Sequelize.TEXT,
      },
      summary: {
        type: Sequelize.TEXT,
      },
      location: {
        type: Sequelize.STRING,
      },
      end_time: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    queryInterface.addIndex(
      'Events',
      ['calendar_id', 'event_id'],
      {
        indexName: 'CalendarEventIndex',
        indicesType: 'UNIQUE',
      }
    );
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Events');
  },
};
