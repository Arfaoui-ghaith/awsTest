'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn(
        'PosSetups',
        'name',
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
