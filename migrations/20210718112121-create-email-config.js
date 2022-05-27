'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('EmailConfig', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      senderEmail: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      ccEmails: {
        type: Sequelize.STRING
      },
      stockDifferencePurchase: {
        type: Sequelize.BOOLEAN
      },
      billRefund: {
        type: Sequelize.BOOLEAN
      },
      discountedBill: {
        type: Sequelize.BOOLEAN
      },
      sessionClose: {
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
      monthlyReport: {
        type: Sequelize.BOOLEAN
      },
      ShopId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Shops',
          key: 'id'
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('EmailConfig');
  }
};
