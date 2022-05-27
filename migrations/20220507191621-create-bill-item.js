'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bill_Items', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      bill_name: { type: Sequelize.STRING},
      item_name: { type: Sequelize.STRING},
      quantity: { type: Sequelize.INTEGER},
      price: { type: Sequelize.INTEGER},
      kitchen_info: { type: Sequelize.TEXT},
      printerId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Printers',
          key: 'id'
        }
      },
      shopId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Shops',
          key: 'id'
        }
      },
      status: { 
        type: Sequelize.ENUM,
        values: ['active','completed'] 
      },
      send_time: { type: Sequelize.DATE},
      bill_no: { type: Sequelize.STRING},
      sessionId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Sessions',
          key: 'id'
        }
      },
      companyId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Companies',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bill_Items');
  }
};