'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('StockLogs', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      date: {
        type: Sequelize.DATE
      },
      existingStock: {
        type: Sequelize.FLOAT
      },
      updatedStock: {
        type: Sequelize.FLOAT
      },
      stockChangeQuantity: {
        type: Sequelize.REAL
      },
      price: {
        type: Sequelize.FLOAT
      },
      notes: {
        type: Sequelize.STRING
      },
      type: {
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
      EmployeeId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Employees',
          key: 'id'
        }
      },
      ShopId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Shops',
          key: 'id'
        }
      },
      StockId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Stocks',
          key: 'id'
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('StockLogs');
  }
};
