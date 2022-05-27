'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Stores', {
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
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
      PosSetupId: {
            type: Sequelize.UUID,
            onDelete: 'CASCADE',
            references: {
                model: 'PosSetups',
                key: 'id'
            }
        },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Stores');
  }
};
