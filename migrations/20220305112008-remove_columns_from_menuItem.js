'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn(
        'MenuItems',
        'printer1',
      ),
      queryInterface.removeColumn(
        'MenuItems',
        'printer2',
      ),
      queryInterface.removeColumn(
        'MenuItems',
        'printer3',
      ),
      queryInterface.addColumn(
        'MenuItems',
        'PrinterId',
          {
            type: Sequelize.UUID,
            allowNull: true,
            onDelete: 'CASCADE',
            references: {
              model: 'Printers',
              key: 'id'
            }
          },
      ),
      queryInterface.addColumn(
        'MenuItems',
        'PrinterName',
          {
            type: Sequelize.STRING,
            allowNull: true,
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
