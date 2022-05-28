'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    return Promise.all([
      queryInterface.addColumn(
        'Roles',
        'viewStores',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
      ),
      queryInterface.addColumn(
        'Roles',
        'addStores',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
      ),
      queryInterface.addColumn(
        'Roles',
        'editStores',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
      ),
      queryInterface.addColumn(
        'Roles',
        'deleteStores',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          default: false
        } 
      ), queryInterface.addColumn(
        'Roles',
        'viewShops',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
      ),
      queryInterface.addColumn(
        'Roles',
        'addShops',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
      ),
      queryInterface.addColumn(
        'Roles',
        'editShops',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
      ),
      queryInterface.addColumn(
        'Roles',
        'deleteShops',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          default: false
        }),queryInterface.addColumn(
          'Roles',
          'addVariant',
          {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            default: false
          }
      ),queryInterface.addColumn(
        'RoleCategories',
        'viewStores',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
      ),
      queryInterface.addColumn(
        'RoleCategories',
        'addStores',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
      ),
      queryInterface.addColumn(
        'RoleCategories',
        'editStores',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
      ),
      queryInterface.addColumn(
        'RoleCategories',
        'deleteStores',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          default: false
        } 
      ), queryInterface.addColumn(
        'RoleCategories',
        'viewShops',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
      ),
      queryInterface.addColumn(
        'RoleCategories',
        'addShops',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
      ),
      queryInterface.addColumn(
        'RoleCategories',
        'editShops',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
      ),
      queryInterface.addColumn(
        'RoleCategories',
        'deleteShops',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          default: false
        }),queryInterface.addColumn(
          'RoleCategories',
          'addVariant',
          {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            default: false
          }
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
