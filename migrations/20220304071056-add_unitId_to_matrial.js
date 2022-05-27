'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Materials',
        'UnitId',
          {
            type: Sequelize.UUID,
            allowNull: true,
            onDelete: 'CASCADE',
            references: {
              model: 'Units',
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
