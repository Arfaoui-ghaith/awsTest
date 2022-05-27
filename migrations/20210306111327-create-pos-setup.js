'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PosSetups', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        type: Sequelize.STRING
      },
      currency: {
        type: Sequelize.STRING
      },
      logo: {
        type: Sequelize.TEXT
      },
      timeFormat: {
        type: Sequelize.STRING
      },
      enableScanner: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      ShopId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Shops',
          key: 'id'
        }
      },
      StoreId: {
        type: Sequelize.UUID,
        // Could not add references to store table as its created after this table
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PosSetups');
  }
};
