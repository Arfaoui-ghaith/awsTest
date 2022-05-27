'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Stocks',
        'MaterialId',
        {
          type: Sequelize.UUID,
          allowNull: true,
          onDelete: 'CASCADE',
          references: {
            model: 'Materials',
            key: 'id'
          }
        },
      ),
      queryInterface.addColumn(
        'PosSetups',
        'image',
        {
          type: Sequelize.TEXT,
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