'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Employees', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING
      },
      pin: {
        type: Sequelize.STRING
      },
      registrationToken: {
        type: Sequelize.UUID,
        allowNull: true
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
      RoleId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Roles',
          key: 'id'
        }
      },
      RoleCategoryId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'RoleCategories',
          key: 'id'
        }
      },
      isDeletable: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        default: true,
      },
      isActive: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        default: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Employees', { cascade: true });
  }
};
