'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
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
      startDate: {
          type: Sequelize.DATE,
          allowNull: true
      },
      endDate: {
          type: Sequelize.DATE,
          allowNull: true
      },
      maxShops: {
          type: Sequelize.INTEGER,
          allowNull: true
      },
      maxEmployees: {
          type: Sequelize.INTEGER,
          allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        default: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        default: new Date()
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Companies', { cascade: true });
  }
};
