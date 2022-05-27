'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      queryInterface.removeColumn('RoleCategories', 'editInventory'),
      queryInterface.removeColumn('Roles', 'editInventory'),
      queryInterface.removeColumn('RoleCategories', 'viewInventory'),
      queryInterface.removeColumn('Roles', 'viewInventory'),
      queryInterface.removeColumn('RoleCategories', 'addInventory'),
      queryInterface.removeColumn('Roles', 'addInventory'),
      queryInterface.removeColumn('RoleCategories', 'deleteInventory'),
      queryInterface.removeColumn('Roles', 'deleteInventory')
  },

  async down (queryInterface, Sequelize) {
    
  }
};
