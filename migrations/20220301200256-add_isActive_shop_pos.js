'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Shops',
        'isActive',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
      ), queryInterface.addColumn(
        'Shops',
        'isDeletable',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: true
        },
      ), queryInterface.addColumn(
        'PosSetups',
        'isActive',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
      ), queryInterface.addColumn(
        'PosSetups',
        'isDeletable',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: true
        },
      ),queryInterface.addColumn(
        'Printers',
        'isActive',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
      ), queryInterface.addColumn(
        'Printers',
        'isDeletable',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: true
        },
      ),queryInterface.addColumn(
        'Customers',
        'isActive',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
      )]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
