'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SellingItemsLogs', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      totalPrice: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
      MenuItemId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'MenuItems',
          key: 'id',
        },
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SellingItemsLogs');
  }
};
