'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MenuItemCategories', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      isActive: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        default: true,
      },
      isDeletable: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        default: true,
      },
      isFavorite: {
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MenuItemCategories');
  }
};
