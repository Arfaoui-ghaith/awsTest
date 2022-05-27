'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'MenuItemCategories',
        'arabicName',
        {
          type: Sequelize.STRING
        },
      ), 
      queryInterface.addColumn(
        'MenuItemCategories',
        'arabicDescription',
        {
          type: Sequelize.STRING
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
