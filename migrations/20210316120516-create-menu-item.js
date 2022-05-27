'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MenuItems', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      arabicName: {
        type: Sequelize.STRING
      },
      arabicDescription: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      materials: {
        type: Sequelize.JSONB
      },
      variants: {
        type: Sequelize.JSONB
      },
      sellingPrice: {
        type: Sequelize.FLOAT
      },
      printer1: {
        type: Sequelize.BOOLEAN
      },
      printer2: {
        type: Sequelize.BOOLEAN
      },
      printer3: {
        type: Sequelize.BOOLEAN
      },
      barCode: {
        type: Sequelize.STRING
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
      employeeId: {
        type: Sequelize.UUID,
        references: {
          model: 'Employees',
          key: 'id'
        }
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
      MenuItemCategoryId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'MenuItemCategories',
          key: 'id'
        }
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MenuItems');
  }
};
