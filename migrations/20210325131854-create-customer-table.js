'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Customers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      name: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      vehicleNumber: {
        type: Sequelize.STRING
      },
      isDeletable: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        default: true,
      },
      ShopId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Shops',
          key: 'id'
        }
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Customers');
  }
};
