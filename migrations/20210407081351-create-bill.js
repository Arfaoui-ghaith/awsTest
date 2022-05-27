'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bills', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      billNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      menuItems: {
        type: Sequelize.JSONB
      },
      methodOfPayment: {
        type: Sequelize.STRING
      },
      totalAmount: {
        type: Sequelize.FLOAT
      },
      voided: {
        type: Sequelize.BOOLEAN
      },
      notes: {
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
      orderType: {
        type: Sequelize.ENUM,
        values: [
          'DINE_IN',
          'TAKE_AWAY',
          'ONLINE_ORDER',
        ],
        allowNull: false,
      },
      orderName: {
        type: Sequelize.STRING
      },
      orderMetaData: {
        type: Sequelize.JSONB
      },
      ShopId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Shops',
          key: 'id'
        }
      },
      SessionId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Sessions',
          key: 'id'
        }
      },
      EmployeeId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Employees',
          key: 'id'
        },
      },
      CustomerId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Customers',
          key: 'id'
        },
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.dropTable('Bills'),
        queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Bills_orderType";'),
      ]);
    });
  }
};
