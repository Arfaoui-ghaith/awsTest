'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Materials',
        'CompanyId',
        {
          type: Sequelize.UUID,
          allowNull: true,
          onDelete: 'CASCADE',
          references: {
            model: 'Companies',
            key: 'id'
          }
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
