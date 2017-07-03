module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('StorageLocations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      short_description: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      long_description: {
        type: Sequelize.TEXT,
      },
      company_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('StorageLocations');
  },
};
